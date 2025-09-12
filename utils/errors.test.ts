// utils/errors.test.ts
import { NetworkError, ApiError, ValidationError } from './errors';

describe('Custom Error Classes', () => {
  test('NetworkError should be instance of Error', () => {
    const error = new NetworkError('Network failed');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('NetworkError');
    expect(error.message).toBe('Network failed');
  });

  test('NetworkError should store status code', () => {
    const error = new NetworkError('Bad gateway', 502);
    expect(error.status).toBe(502);
  });

  test('ApiError should be instance of Error', () => {
    const error = new ApiError('API error occurred');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ApiError');
    expect(error.message).toBe('API error occurred');
  });

  test('ApiError should store status code', () => {
    const error = new ApiError('Not found', 404);
    expect(error.status).toBe(404);
  });

  test('ValidationError should be instance of Error', () => {
    const error = new ValidationError('Invalid input');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe('Invalid input');
  });
});