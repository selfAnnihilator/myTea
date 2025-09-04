import express from 'express';
import cors from 'cors';
import type { Article, Category } from './types';

const app = express();
const PORT = 8080;

// Enable CORS for all routes, allowing the frontend (on a different port) to communicate.
app.use(cors());

// --- Logic from the former api/news.ts ---

// The NewsAPI key is stored securely on the server.
const API_KEY = '8decae36d4654f2b8de11d4253a82f49';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Define the categories to fetch from the API.
const categories: Category[] = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology', 'Politics'];

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

/**
 * Fetches articles for a single category from NewsAPI.
 * @param category The category to fetch.
 * @returns A promise that resolves to an array of processed articles.
 */
async function getArticlesForCategory(category: Category): Promise<Article[]> {
  const url = `${NEWS_API_BASE_URL}?country=us&category=${category.toLowerCase()}&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`NewsAPI request for ${category} failed with status ${response.status}`);
      return []; // Return empty array on failure for this category
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

app.get('/api/news', async (req, res) => {
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

    res.status(200).json(shuffledArticles);
  } catch (error) {
    console.error("Failed to fetch news from NewsAPI:", error);
    res.status(500).json({ message: "The news service is currently unavailable. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
