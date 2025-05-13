import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HomePlaceHolder() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer} />
      <Text style={styles.title}>No saved projects</Text>
      <Text style={styles.title}>
        Scan QR code, open a Rork link or {'\n'}sign in to your Rork account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#A0A0A0',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8E8E93',
    textAlign: 'center',
  },
});
