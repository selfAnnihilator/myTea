// utils/__tests__/cache.test.ts
import SimpleCache, { articleCache, ARTICLE_CACHE_KEY } from '../../src/utils/cache';

describe('SimpleCache', () => {
  let cache: SimpleCache<any>;

  beforeEach(() => {
    cache = new SimpleCache();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set and get values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('should return null for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBeNull();
  });

  test('should overwrite existing keys', () => {
    cache.set('key1', 'value1');
    cache.set('key1', 'value2');
    expect(cache.get('key1')).toBe('value2');
  });

  test('should respect TTL and expire entries', () => {
    jest.useFakeTimers();
    
    cache.set('key1', 'value1', 1000); // 1 second TTL
    expect(cache.get('key1')).toBe('value1');
    
    // Advance time by 1.5 seconds
    jest.advanceTimersByTime(1500);
    
    expect(cache.get('key1')).toBeNull();
  });

  test('should handle has() method correctly', () => {
    cache.set('key1', 'value1');
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('nonexistent')).toBe(false);
  });

  test('should delete entries', () => {
    cache.set('key1', 'value1');
    expect(cache.has('key1')).toBe(true);
    
    cache.delete('key1');
    expect(cache.has('key1')).toBe(false);
  });

  test('should clear all entries', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
    
    cache.clear();
    expect(cache.size()).toBe(0);
  });

  test('should cleanup expired entries', () => {
    jest.useFakeTimers();
    
    cache.set('key1', 'value1', 1000); // 1 second TTL
    cache.set('key2', 'value2', 2000); // 2 second TTL
    
    // Advance time by 1.5 seconds
    jest.advanceTimersByTime(1500);
    
    // Manually trigger cleanup
    (cache as any).cleanup();
    
    expect(cache.has('key1')).toBe(false);
    expect(cache.has('key2')).toBe(true);
  });
});

describe('articleCache', () => {
  beforeEach(() => {
    articleCache.clear();
  });

  test('should be a singleton instance', () => {
    const cache1 = articleCache;
    const cache2 = articleCache;
    expect(cache1).toBe(cache2);
  });

  test('should use ARTICLE_CACHE_KEY', () => {
    const articles = [{ 
      id: '1', 
      title: 'Test Article',
      imageUrl: 'https://example.com/image.jpg',
      publisher: 'Test Publisher',
      sourceUrl: 'https://example.com/article',
      overview: 'Test overview',
      category: 'Technology' as const
    }];
    articleCache.set(ARTICLE_CACHE_KEY, articles);
    
    expect(articleCache.get(ARTICLE_CACHE_KEY)).toEqual(articles);
  });
});