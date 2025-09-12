// api/__tests__/news.test.js
// Mock environment variables
process.env.NEWS_API_KEY = 'test-api-key';

// Mock fetch function
global.fetch = jest.fn();

describe('News API Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return 405 for non-GET requests', async () => {
    // Import the handler
    const handler = (await import('../news.ts')).default;
    
    const mockRequest = { method: 'POST' };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await handler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(405);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Method Not Allowed' });
  });
});