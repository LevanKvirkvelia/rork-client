import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../App';
import { Button } from '../components/Button';
import { useAuth } from '../providers/AuthProvider';
import { useLayoutEffect } from 'react';

export function ProfileScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Profile'>>();
  const { signOut } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header enableSearch={false} title="Profile" />,
      headerShown: true,
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
