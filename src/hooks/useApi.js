import { useState, useEffect } from 'react';

const memoryCache = new Map();

/**
 * Universal Generic Data Hook
 * Handles fetching, memory caching, loading states, and error handling in 25 lines.
 */
export function useApi(endpoint, fallbackData = null) {
  const [data, setData] = useState(() => memoryCache.get(endpoint) || fallbackData);
  const [loading, setLoading] = useState(!memoryCache.has(endpoint));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    if (memoryCache.has(endpoint)) {
      setData(memoryCache.get(endpoint));
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          memoryCache.set(endpoint, json);
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
