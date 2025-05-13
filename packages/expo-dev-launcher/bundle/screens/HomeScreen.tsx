import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { HomeHeader } from '../components/HomeHeader';
import { HomePlaceHolder } from '../components/HomePlaceHolder';
import { Button } from '../components/Button';
import { View, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../App';
import { loadApp } from '../native-modules/DevLauncherInternal';

export function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Main'>>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader />,
      headerShown: true,
    });
  }, [navigation]);

  const onSignInPressed = () => {
    navigation.navigate('Login');
  };

  const onTestOpenAppPressed = () => {
    Alert.prompt(
      'Enter App URL',
      'Enter the URL of the app you want to open:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (url) => {
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
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <HomePlaceHolder />
        <Button
          title="Sign in to view your projects"
          onPress={onSignInPressed}
        />
        <View style={{ marginTop: 12 }} />
        {/* <Button title="Test openApp" onPress={onTestOpenAppPressed} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
