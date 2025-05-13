import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import { LogBox, View } from 'react-native';
import { AppProviders } from './providers/AppProviders';
import { HomeScreen } from './screens/HomeScreen';
import { CircleUserRound, House } from 'lucide-react-native';
import { LoginScreen } from './screens/LoginScreen';
import { ProfileScreen } from './screens/ProfileScreen';

LogBox.ignoreLogs(['_NativeDevLoadingView.default.']);

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
      <AppProviders>
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
      </AppProviders>
    </View>
  );
}

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
