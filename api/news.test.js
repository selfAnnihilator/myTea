// api/news.test.js
// Simple test to verify the API endpoint is working

async function testApiEndpoint() {
  try {
    console.log('Testing API endpoint...');
    
    // Set a test API key (this won't work but we're just testing the endpoint)
    process.env.NEWS_API_KEY = 'test-key';
    
    // Import the handler
    const handler = (await import('./news.js')).default;
    
    // Mock request and response objects
    const mockRequest = {
      method: 'GET'
    };
    
    let mockResponseData = null;
    const mockResponse = {
      statusCode: 200,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        mockResponseData = { statusCode: this.statusCode, data };
      }
    };
    
    // Call the handler
    await handler(mockRequest, mockResponse);
    
    console.log('API test completed');
    console.log('Response status:', mockResponseData?.statusCode);
    console.log('Response data keys:', mockResponseData?.data ? Object.keys(mockResponseData.data) : 'No data');
    
  } catch (error) {
    console.error('API test failed:', error);
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testApiEndpoint();
}