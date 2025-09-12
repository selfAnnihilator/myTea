// services/__tests__/newsService.test.ts
import { fetchArticles } from '../newsService';
import { NetworkError, ApiError } from '../../utils/errors';

// Mock the fetch function
global.fetch = jest.fn();

describe('newsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  test('fetchArticles should throw ApiError on API error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(fetchArticles()).rejects.toThrow(ApiError);
  });
});