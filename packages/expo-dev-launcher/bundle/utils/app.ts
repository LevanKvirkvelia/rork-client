import { Alert } from 'react-native';
import { loadApp } from '../native-modules/DevLauncherInternal';

export const handleOpenApp = async (url?: string) => {
  if (url) {
    try {
      await loadApp(url);
    } catch (error) {
      console.error('Failed to open app:', error);
      Alert.alert(
        'Error',
        'Failed to open app. Check the console for more details.'
      );
    }
  } else {
    Alert.alert(
      'Not available',
      'This project does not have a production URL.'
    );
  }
};
