/**
 * @file This service is responsible for fetching news articles from the Spaceflight News API.
 * This API is open-source, requires no key, and supports client-side requests,
 * making it a reliable choice for this application.
 */
import type { Article, Category } from '../types';

const API_BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=50';

// A simple function to categorize articles based on keywords.
const categorizeArticle = (title: string, summary: string): Category => {
  const lowerCaseContent = `${title.toLowerCase()} ${summary.toLowerCase()}`;
  if (/\b(rocket|spacex|nasa|launch|engine|satellite|crew|dragon|artemis)\b/.test(lowerCaseContent)) {
    return 'Technology';
  }
  if (/\b(planet|star|galaxy|astronomy|science|discovery|mars|moon)\b/.test(lowerCaseContent)) {
    return 'Science';
  }
  return 'Technology'; // Default category for space news
};

interface SpaceflightApiArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface SpaceflightApiResponse {
  results: SpaceflightApiArticle[];
}

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data: SpaceflightApiResponse = await response.json();

    const articles = data.results
      .filter(article => article.title && article.image_url && article.summary)
      .map((article): Article => ({
        id: article.id.toString(),
        title: article.title,
        imageUrl: article.image_url,
        publisher: article.news_site,
        sourceUrl: article.url,
        overview: article.summary,
        category: categorizeArticle(article.title, article.summary),
      }));

    return articles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    if (error instanceof Error) {
      // Re-throw a user-friendly error message to be displayed in the UI
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while fetching articles.");
  }
};