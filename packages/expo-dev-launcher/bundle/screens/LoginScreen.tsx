import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Apple, Chrome, X } from 'lucide-react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 10 }]}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <X size={24} color="#000000" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <View style={styles.logo} />
      </View>

      <Text style={styles.title}>Make apps in {'\n'}minutes</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue with Apple"
          icon={<AntDesign name="apple1" size={20} color={'white'} />}
        />
        <Button
          title="Continue with Google"
          icon={<AntDesign name="google" size={20} />}
          variant="outlined"
        />
      </View>

      <View style={[styles.signupContainer, { marginBottom: insets.bottom }]}>
        <Text style={styles.signupText}>New to Rork? </Text>
        <TouchableOpacity>
          <Text style={[styles.signupText, styles.signupLink]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#272727',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 'auto',
    lineHeight: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  signupLink: {
    color: '#000000',
  },
});
