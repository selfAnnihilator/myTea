/**
 * @file This service is responsible for fetching news articles from our own backend endpoint.
 * The backend handles the communication with the external NewsAPI, keeping API keys secure.
 */
import type { Article } from '../types';

// The API_ENDPOINT now points to the relative path (works in production and development)
const API_ENDPOINT = '/api/news';

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    // For development, we need to use the full localhost URL for the API route
    // For production, we'll use the relative path which will be handled by Vercel
    const url = process.env.NODE_ENV === 'development' 
      ? `http://localhost:5173${API_ENDPOINT}`  // Vite's default port
      : API_ENDPOINT;
      
    const response = await fetch(url);
    
    // Check if the request was successful.
    if (!response.ok) {
      // Create a more informative error message including the status.
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Make fetching more robust: read as text first, then parse.
    // This prevents potential JSON parsing errors with streaming responses.
    const responseText = await response.text();
    try {
        const articles: Article[] = JSON.parse(responseText);
        return articles;
    } catch (parseError) {
        console.error("Failed to parse JSON response:", responseText);
        throw new Error("Received malformed data from the backend.");
    }
    
  } catch (error) {
    console.error("Failed to fetch articles from backend:", error);
    // Re-throw the error so it can be caught and handled by the UI component.
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while fetching articles.");
  }
};