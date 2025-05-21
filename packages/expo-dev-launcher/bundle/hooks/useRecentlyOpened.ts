import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_RECENTLY_OPENED = 5;
const STORAGE_KEY = 'deepLinkUrls';

export const useRecentlyOpened = () => {
  const [recentlyOpened, setRecentlyOpened] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentlyOpened = async () => {
      try {
        const storedUrls = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUrls) {
          setRecentlyOpened(JSON.parse(storedUrls));
        }
      } catch (error) {
        console.error(
          'Failed to load recently opened URLs from storage',
          error
        );
      }
    };

    loadRecentlyOpened();
  }, []);

  const addRecentlyOpened = useCallback(
    async (url: string) => {
      try {
        const updatedUrls = [
          url,
          ...recentlyOpened.filter((u) => u !== url),
        ].slice(0, MAX_RECENTLY_OPENED);
        setRecentlyOpened(updatedUrls);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUrls));
      } catch (error) {
        console.error('Failed to store recently opened URL', error);
      }
    },
    [recentlyOpened]
  );

  return { recentlyOpened, addRecentlyOpened };
};
