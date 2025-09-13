// utils/__tests__/imageOptimizer.test.ts
import { optimizeImageUrl, getPlaceholderImage } from '../../src/utils/imageOptimizer';

describe('imageOptimizer', () => {
  test('should return original URL if no optimization service is configured', () => {
    const originalUrl = 'https://example.com/image.jpg';
    const optimizedUrl = optimizeImageUrl(originalUrl, 600, 400, 75);
    
    // Since no service is configured, it should try simple optimization
    // which adds URL parameters
    expect(optimizedUrl).toContain('https://example.com/image.jpg');
  });

  test('should handle invalid URLs gracefully', () => {
    const optimizedUrl = optimizeImageUrl('', 600, 400, 75);
    expect(optimizedUrl).toBe('');
    
    const optimizedUrl2 = optimizeImageUrl(null as any, 600, 400, 75);
    expect(optimizedUrl2).toBeNull();
  });

  test('should generate placeholder image', () => {
    const placeholder = getPlaceholderImage(600, 400);
    expect(placeholder).toContain('data:image/svg+xml;base64');
    
    // Decode the base64 to check content
    const base64Data = placeholder.split(',')[1];
    const decoded = atob(base64Data);
    expect(decoded).toContain('width="600"');
    expect(decoded).toContain('height="400"');
  });

  test('should generate default placeholder when no dimensions provided', () => {
    const placeholder = getPlaceholderImage();
    expect(placeholder).toContain('data:image/svg+xml;base64');
    
    // Decode the base64 to check content
    const base64Data = placeholder.split(',')[1];
    const decoded = atob(base64Data);
    expect(decoded).toContain('width="600"');
    expect(decoded).toContain('height="400"');
  });
});