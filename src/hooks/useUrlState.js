import { useState, useEffect, useCallback } from 'react';

/**
 * URL Params as Global State Sync Hook
 * Eliminates boilerplate by syncing React state with URL search parameters.
 */
export function useUrlState(paramKey, defaultValue = '') {
  const [value, setValueState] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    const params = new URLSearchParams(window.location.search);
    return params.get(paramKey) || defaultValue;
  });

  const setValue = useCallback((newValue) => {
    setValueState(newValue);
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    if (newValue && newValue !== defaultValue) {
      url.searchParams.set(paramKey, newValue);
    } else {
      url.searchParams.delete(paramKey);
    }
    window.history.replaceState({}, '', url.toString());
  }, [paramKey, defaultValue]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setValueState(params.get(paramKey) || defaultValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [paramKey, defaultValue]);

  return [value, setValue];
}
