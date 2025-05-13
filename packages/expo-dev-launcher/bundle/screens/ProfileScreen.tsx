import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../App';

export function ProfileScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Profile'>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header enableSearch={false} title="Profile" />,
      headerShown: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
