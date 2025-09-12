import { VercelRequest, VercelResponse } from '@vercel/node';

// The NewsAPI key is stored securely on the server.
const API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Define the categories to fetch from the API.
const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology', 'Politics'];

// Validate that the API key is present
if (!API_KEY) {
  console.error('NEWS_API_KEY environment variable is not set');
}

interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  publisher: string;
  sourceUrl: string;
  overview: string;
  category: string;
}

// Add a retry function for API calls
async function fetchWithRetry(url: string, retries: number = 3): Promise<Response> {
  let lastError: Error;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url);
      // If response is ok or it's a client error (4xx), don't retry
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
      // For server errors (5xx), we might retry
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    } catch (error) {
      lastError = error as Error;
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch after retries');
}

/**
 * Fetches articles for a single category from NewsAPI.
 * @param category The category to fetch.
 * @returns A promise that resolves to an array of processed articles.
 */
async function getArticlesForCategory(category: string): Promise<Article[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error('NEWS_API_KEY environment variable is not set');
    return [];
  }

  const url = `${NEWS_API_BASE_URL}?country=us&category=${category.toLowerCase()}&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetchWithRetry(url);
    if (!response.ok) {
      console.error(`NewsAPI request for ${category} failed with status ${response.status}`);
      // Return empty array on failure for this category, but log the error
      return [];
    }

    const data: NewsApiResponse = await response.json();
    
    return data.articles
      .map((item) => {
        // Ensure the article has the minimum required data
        if (!item.title || !item.url || item.title === '[Removed]') {
          return null;
        }

        return {
          id: item.url, // URL is a good unique identifier
          title: item.title,
          imageUrl: item.urlToImage || `https://picsum.photos/seed/${encodeURIComponent(item.title)}/600/400`,
          publisher: item.source.name,
          sourceUrl: item.url,
          overview: item.description || 'No overview available.',
          category: category,
        };
      })
      .filter((article): article is Article => article !== null);
  } catch (error) {
    console.error(`Error fetching articles for ${category}:`, error);
    return [];
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check if API key is available
  if (!API_KEY) {
    return response.status(500).json({ 
      message: "Server configuration error. Please contact the administrator." 
    });
  }

  try {
    // Fetch all categories concurrently for performance.
    const promises = categories.map(getArticlesForCategory);
    const results = await Promise.all(promises);

    // Flatten the array of arrays into a single array.
    const allArticles = results.flat();

    // Deduplicate articles based on their source URL.
    const seenUrls = new Set<string>();
    const uniqueArticles = allArticles.filter(article => {
      if (seenUrls.has(article.sourceUrl)) {
        return false;
      }
      seenUrls.add(article.sourceUrl);
      return true;
    });

    // Shuffle for variety
    const shuffledArticles = uniqueArticles.sort(() => Math.random() - 0.5);

    return response.status(200).json(shuffledArticles);
  } catch (error) {
    console.error("Failed to fetch news from NewsAPI:", error);
    return response.status(500).json({ message: "The news service is currently unavailable. Please try again later." });
  }
}