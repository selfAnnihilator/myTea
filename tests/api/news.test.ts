// api/__tests__/news.test.ts
import handler from '../../api/news';

// Mock environment variables
process.env.NEWS_API_KEY = 'test-api-key';

// Mock fetch function
global.fetch = jest.fn();

describe('News API Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return 405 for non-GET requests', async () => {
    const mockRequest = {
      method: 'POST'
    } as any;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(405);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Method Not Allowed' });
  });

  test('should return 500 if API key is not set', async () => {
    // Temporarily unset the API key
    const originalApiKey = process.env.NEWS_API_KEY;
    delete process.env.NEWS_API_KEY;

    const mockRequest = {
      method: 'GET'
    } as any;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Server configuration error. Please add the NEWS_API_KEY environment variable in your Vercel project settings."
    });

    // Restore the API key
    process.env.NEWS_API_KEY = originalApiKey;
  });

  test('should return articles when successful', async () => {
    const mockApiResponse = {
      status: 'ok',
      totalResults: 1,
      articles: [
        {
          source: { id: null, name: 'Test Source' },
          author: 'Test Author',
          title: 'Test Article',
          description: 'Test Description',
          url: 'https://example.com/article',
          urlToImage: 'https://example.com/image.jpg',
          publishedAt: '2023-01-01T00:00:00Z',
          content: 'Test Content'
        }
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const mockRequest = {
      method: 'GET'
    } as any;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
    const response = mockResponse.json.mock.calls[0][0];
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  });
});