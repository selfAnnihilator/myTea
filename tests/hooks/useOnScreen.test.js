// hooks/__tests__/useOnScreen.test.js
import { renderHook } from '@testing-library/react';
import { useOnScreen } from '../../src/hooks/useOnScreen';

// Mock the IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReset();
  mockObserve.mockReset();
  mockUnobserve.mockReset();
  mockDisconnect.mockReset();

  global.IntersectionObserver = mockIntersectionObserver.mockImplementation(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect
  }));
});

describe('useOnScreen', () => {
  test('should return false initially', () => {
    const { result } = renderHook(() => useOnScreen({ current: null }));
    expect(result.current).toBe(false);
  });

  test('should observe the element', () => {
    const element = { current: document.createElement('div') };
    renderHook(() => useOnScreen(element));
    
    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(element.current);
  });
});