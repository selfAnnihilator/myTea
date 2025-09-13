// hooks/__tests__/useTypingEffect.test.js
import { renderHook, act } from '@testing-library/react';
import { useTypingEffect } from '../../src/hooks/useTypingEffect';

// Mock setTimeout and setInterval to control timing in tests
jest.useFakeTimers();

describe('useTypingEffect', () => {
  test('should initialize with empty string', () => {
    const { result } = renderHook(() => useTypingEffect('Hello World', 100));
    expect(result.current).toBe('');
  });

  test('should type out the full text over time', () => {
    const { result } = renderHook(() => useTypingEffect('Hi', 100));
    
    // Advance timers to type first character
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(result.current).toBe('H');
    
    // Advance timers to type second character
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    expect(result.current).toBe('Hi');
  });
});