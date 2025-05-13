import { statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from './supabase';
import { Alert, Platform } from 'react-native';
import { StackNavigatorParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

export const signInWithGoogle = async (
  navigation: StackNavigationProp<StackNavigatorParamList, 'Main'>
) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo.data.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        navigation.navigate('Main');
      }
    } else {
      throw new Error('No ID token present!');
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('In Progress', 'Sign in is already in progress.');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert(
        'Play Services Error',
        'Google Play Services not available or outdated.'
      );
    } else {
      Alert.alert('Error', 'An unknown error occurred during Google Sign-In.');
    }
  }
};

export const signInWithApple = async (
  navigation: StackNavigationProp<StackNavigatorParamList, 'Main'>
) => {
  if (Platform.OS !== 'ios') {
    Alert.alert('Error', 'Apple Sign-In is only available on iOS devices.');
    return;
  }

  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        navigation.navigate('Main');
      }
    } else {
      throw new Error('No identityToken present!');
    }
  } catch (error: any) {
    if (error.code === 'ERR_REQUEST_CANCELED') {
      Alert.alert('Cancelled', 'Apple Sign-In was cancelled.');
    } else {
      console.error(error);
      Alert.alert('Error', 'An unknown error occurred during Apple Sign-In.');
    }
  }
};
