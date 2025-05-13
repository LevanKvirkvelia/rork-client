import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

type HeaderProps = {
  enableSearch?: boolean;
  title?: string;
};

export function Header({
  enableSearch = false,
  title = 'My Projects',
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>{title}</Text>
      {enableSearch && (
        <View style={styles.searchContainer}>
          <Search size={18} color="#8E8E93" />
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 36,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: -0.2,
    color: '#000000',
    marginLeft: 4,
  },
});
