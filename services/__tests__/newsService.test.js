// services/__tests__/newsService.test.js
// services/__tests__/newsService.test.js
/**
 * @jest-environment jsdom
 */
import { fetchArticles, clearArticleCache } from '../newsService';
import { NetworkError, ApiError } from '../../utils/errors.ts';

// Mock the fetch function
global.fetch = jest.fn();

// Mock the cache
jest.mock('../../utils/cache.ts', () => {
  const actualCache = jest.requireActual('../../utils/cache.ts');
  return {
    ...actualCache,
    articleCache: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    },
    ARTICLE_CACHE_KEY: 'articles'
  };
});

describe('newsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearArticleCache();
  });

  test('fetchArticles calls the correct URL in development', async () => {
    // Mock process.env.NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const mockResponse = {
      ok: true,
      text: () => Promise.resolve('[]')
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    await fetchArticles();
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/news');
    
    // Restore original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('fetchArticles calls the correct URL in production', async () => {
    // Mock process.env.NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    const mockResponse = {
      ok: true,
      text: () => Promise.resolve('[]')
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    await fetchArticles();
    
    expect(global.fetch).toHaveBeenCalledWith('/api/news');
    
    // Restore original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('fetchArticles throws NetworkError when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    await expect(fetchArticles()).rejects.toThrow('Request failed with status 500');
  });

  test('fetchArticles throws NetworkError when network fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));
    
    await expect(fetchArticles()).rejects.toThrow('Network error occurred while fetching articles');
  });

  test('fetchArticles returns parsed articles when successful', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Test Article',
        imageUrl: 'https://example.com/image.jpg',
        publisher: 'Test Publisher',
        sourceUrl: 'https://example.com/article',
        overview: 'Test overview',
        category: 'Technology'
      }
    ];
    
    const mockResponse = {
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockArticles))
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    const articles = await fetchArticles();
    
    expect(articles).toEqual(mockArticles);
  });

  test('fetchArticles throws ApiError when JSON parsing fails', async () => {
    const mockResponse = {
      ok: true,
      text: () => Promise.resolve('invalid json')
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    await expect(fetchArticles()).rejects.toThrow('Received malformed data from the backend');
  });
});