'use client';
import { produce } from 'immer';
import { useCallback, useState } from 'react';

const useRecentSearches = () => {
  const saveRecentSearchToLocalStorage = (recentSearches: string[]) => {
    // if (!window) return;
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };
  const getRecentSearchesFromLocalStorage = () => {
    // if (!window) return [];
    return JSON.parse(localStorage.getItem('recentSearches') ?? '[]');
  };

  const defaultRecentSearches: string[] = getRecentSearchesFromLocalStorage();
  // const defaultRecentSearches: string[] = [];

  const [recentSearches, setRecentSearches] = useState<string[]>(
    defaultRecentSearches,
  );

  const deleteRecentSearch = useCallback((index: number) => {
    setRecentSearches(
      produce(prev => {
        prev.splice(index, 1);
        saveRecentSearchToLocalStorage(prev);
      }),
    );
  }, []);

  const addRecentSearch = useCallback((search: string) => {
    setRecentSearches(
      produce(prev => {
        if (search !== '' && prev.indexOf(search) === -1) {
          prev.unshift(search);
          prev.splice(5)
        }
        saveRecentSearchToLocalStorage(prev);
      }),
    );
  }, [setRecentSearches]);

  return {
    recentSearches,
    addRecentSearch,
    setRecentSearches,
    deleteRecentSearch,
    saveRecentSearchToLocalStorage,
    getRecentSearchesFromLocalStorage,
  };
};
export default useRecentSearches;
