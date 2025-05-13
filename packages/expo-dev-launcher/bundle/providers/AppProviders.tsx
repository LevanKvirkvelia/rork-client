import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  darkNavigationTheme,
  lightNavigationTheme,
  ThemeProvider,
} from 'expo-dev-client-components';
import * as React from 'react';
import { useColorScheme } from 'react-native';

export type AppProvidersProps = {
  children?: React.ReactNode;
  initialNavigationState?: any;
};

export function AppProviders({
  children,

  initialNavigationState,
}: AppProvidersProps) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const navTheme = {
    ...(isDark ? darkNavigationTheme : lightNavigationTheme),
    fonts: DefaultTheme.fonts,
  };

  return (
    <ThemeProvider themePreference="no-preference">
      <NavigationContainer
        initialState={initialNavigationState}
        theme={navTheme}
      >
        {children}
      </NavigationContainer>
    </ThemeProvider>
  );
}
