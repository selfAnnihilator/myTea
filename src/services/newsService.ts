/**
 * @file This service is responsible for fetching news articles from our own backend endpoint.
 * The backend handles the communication with the external NewsAPI, keeping API keys secure.
 */
import type { Article } from '../types';
import { NetworkError, ApiError } from '../utils/errors.ts';
import { articleCache, ARTICLE_CACHE_KEY } from '../utils/cache.ts';

// The API_ENDPOINT now points to the relative path (works in production and development)
const API_ENDPOINT = '/api/news';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const CACHE_TTL = 300000; // 5 minutes

/**
 * Delays execution for the specified number of milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches articles with retry logic
 */
async function fetchWithRetry(url: string, retries: number = 0): Promise<Response> {
  try {
    const response = await fetch(url);
    
    // If response is ok, return it
    if (response.ok) {
      return response;
    }
    
    // If it's a client error (4xx), don't retry
    if (response.status >= 400 && response.status < 500) {
      throw new ApiError(`API request failed with status ${response.status}`, response.status);
    }
    
    // For server errors (5xx) or network errors, retry if we have retries left
    throw new NetworkError(`Request failed with status ${response.status}`, response.status);
  } catch (error) {
    // If it's a network error and we have retries left, try again
    if (retries < MAX_RETRIES) {
      console.warn(`Request failed, retrying in ${RETRY_DELAY}ms... (${retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries + 1);
    }
    
    // If it's already our custom error, rethrow it
    if (error instanceof NetworkError || error instanceof ApiError) {
      throw error;
    }
    
    // Otherwise, wrap it as a NetworkError
    throw new NetworkError('Network error occurred while fetching articles');
  }
}

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    // Check cache first
    const cachedArticles = articleCache.get(ARTICLE_CACHE_KEY);
    if (cachedArticles) {
      console.log('Returning cached articles');
      return cachedArticles;
    }
    
    // For development, we need to use the full localhost URL for the API route
    // For production, we'll use the relative path which will be handled by Vercel
    const url = process.env.NODE_ENV === 'development' 
      ? `http://localhost:3000${API_ENDPOINT}`  // Vercel's default port for API routes
      : API_ENDPOINT;
      
    const response = await fetchWithRetry(url);
    
    // Make fetching more robust: read as text first, then parse.
    // This prevents potential JSON parsing errors with streaming responses.
    const responseText = await response.text();
    
    try {
        const articles: Article[] = JSON.parse(responseText);
        
        // Cache the articles
        articleCache.set(ARTICLE_CACHE_KEY, articles, CACHE_TTL);
        
        return articles;
    } catch (error) {
        console.error("Failed to parse JSON response:", responseText);
        throw new ApiError(`Received malformed data from the backend: ${error.message}`);
    }
    
  } catch (error) {
    console.error("Failed to fetch articles from backend:", error);
    
    // Re-throw the error so it can be caught and handled by the UI component.
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("An unknown error occurred while fetching articles.");
  }
};

// Function to clear the cache
export const clearArticleCache = (): void => {
  articleCache.delete(ARTICLE_CACHE_KEY);
};