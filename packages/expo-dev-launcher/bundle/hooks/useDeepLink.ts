import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

export function useDeepLink() {
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);

  const clear = useCallback(() => {
    setDeepLinkUrl(null);
  }, []);

  useEffect(() => {
    // on app cold start
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setDeepLinkUrl(url);
      }
    };

    getInitialUrl();

    // when app is in foreground or background
    const handleUrl = ({ url }: { url: string }) => {
      setDeepLinkUrl(url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    };
  }, []);

  const url = deepLinkUrl?.replace('rork://', '');
  return { url, clear };
}
