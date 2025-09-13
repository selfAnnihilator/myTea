// services/__tests__/newsService.test.ts
/**
 * @jest-environment jsdom
 */
import { fetchArticles, clearArticleCache } from '../../src/services/newsService';
import { NetworkError, ApiError } from '../../src/utils/errors.ts';

// Mock the fetch function
global.fetch = jest.fn();

describe('newsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearArticleCache(); // Clear cache before each test
  });

  test('fetchArticles should return articles when successful', async () => {
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

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockArticles))
    });

    const articles = await fetchArticles();
    expect(articles).toEqual(mockArticles);
  });

  test('fetchArticles should throw NetworkError on network failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchArticles()).rejects.toThrow(NetworkError);
  });

  test('fetchArticles should throw NetworkError on API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(fetchArticles()).rejects.toThrow(NetworkError);
  });

  test('fetchArticles should throw ApiError on client error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchArticles()).rejects.toThrow(ApiError);
  });
});