import cors from 'cors';

// The NewsAPI key is stored securely on the server.
const API_KEY = process.env.NEWS_API_KEY || '8decae36d4654f2b8de11d4253a82f49';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Define the categories to fetch from the API.
const categories = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology', 'Politics'];

/**
 * Fetches articles for a single category from NewsAPI.
 * @param category The category to fetch.
 * @returns A promise that resolves to an array of processed articles.
 */
async function getArticlesForCategory(category) {
  const url = `${NEWS_API_BASE_URL}?country=us&category=${category.toLowerCase()}&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`NewsAPI request for ${category} failed with status ${response.status}`);
      return []; // Return empty array on failure for this category
    }

    const data = await response.json();
    
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
      .filter((article) => article !== null);
  } catch (error) {
    console.error(`Error fetching articles for ${category}:`, error);
    return [];
  }
}

export default async function handler(request, response) {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Fetch all categories concurrently for performance.
    const promises = categories.map(getArticlesForCategory);
    const results = await Promise.all(promises);

    // Flatten the array of arrays into a single array.
    const allArticles = results.flat();

    // Deduplicate articles based on their source URL.
    const seenUrls = new Set();
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