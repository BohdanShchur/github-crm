import { useEffect, useState } from 'react';

/**
 * useDebounce - returns a debounced value after a delay
 * @param value - the value to debounce
 * @param delay - debounce delay in ms (default: 1000)
 */
export function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
