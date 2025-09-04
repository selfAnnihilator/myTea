/**
 * @file This service is responsible for fetching news articles from our own backend endpoint.
 * The backend handles the communication with the external NewsAPI, keeping API keys secure.
 */
import type { Article } from '../types';

// The API_ENDPOINT now points to the local Node.js server.
const API_ENDPOINT = 'http://localhost:8080/api/news';

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(API_ENDPOINT);
    
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