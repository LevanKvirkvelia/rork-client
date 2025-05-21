import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { CircleUserRound, House } from 'lucide-react-native';
import { LoginScreen } from './screens/LoginScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handleOpenApp } from './utils/app';
import { useDeepLink } from './hooks/useDeepLink';
import { useEffect } from 'react';
import { useRecentlyOpened } from './hooks/useRecentlyOpened';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

type TabNavigatorParamList = {
  Home: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabNavigatorParamList, 'tab'>();

export type StackNavigatorParamList = {
  Main: undefined;
  Profile: undefined;
  Login: undefined;
};
const Stack = createStackNavigator<StackNavigatorParamList, 'main'>();

export function App() {
  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistQueryClientProvider>
      </AuthProvider>
    </View>
  );
}

const RootNavigator = () => {
  const { session, isLoading } = useAuth();
  const { url, clear } = useDeepLink();
  const { addRecentlyOpened } = useRecentlyOpened();

  useEffect(() => {
    if (url) {
      console.log('url', url);
      const fullUrl = `https://${url}`;
      handleOpenApp(fullUrl);
      addRecentlyOpened(fullUrl);
      clear();
    }
  }, [url, clear, addRecentlyOpened]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      id="main"
      initialRouteName="Main"
      screenOptions={{
        presentation: 'modal',
        gestureEnabled: false,
      }}
      detachInactiveScreens={false}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      id="tab"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOpacity: 0,
        },
        sceneStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <House size={24} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <CircleUserRound size={24} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
