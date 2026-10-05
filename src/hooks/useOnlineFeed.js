/**
 * @file useOnlineFeed.js
 * @description React hook to fetch and hydrate dynamic online data with zero hardcoded fake arrays.
 */

import { useState, useEffect } from 'react';
import { fetchLiveTopicIntelligence, fetchLiveNicheFeed, fetchLiveBullionRates } from '../services/onlineDataService';

export function useOnlineTopic(query) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!query) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchLiveTopicIntelligence(query)
      .then(res => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { data, isLoading, error };
}

export function useOnlineNicheFeed(topicsList = []) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!topicsList || topicsList.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchLiveNicheFeed(topicsList).then(res => {
      if (isMounted) {
        setItems(res);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(topicsList)]);

  return { items, isLoading };
}

export function useOnlineBullion() {
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchLiveBullionRates().then(res => {
      if (isMounted) {
        setRates(res);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { rates, isLoading };
}
