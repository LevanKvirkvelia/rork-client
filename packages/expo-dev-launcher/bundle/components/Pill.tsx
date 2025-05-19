import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { icons } from 'lucide-react-native';

interface PillProps {
  title: string;
  icon: keyof typeof icons;
  active: boolean;
  onPress: () => void;
}

export const Pill: React.FC<PillProps> = ({ title, icon, active, onPress }) => {
  const LucideIcon = icons[icon];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        active ? styles.activeContainer : styles.inactiveContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {LucideIcon && (
          <LucideIcon
            size={18}
            color={active ? '#FFFFFF' : '#383838'}
            strokeWidth={1.5}
          />
        )}
      </View>
      <Text
        style={[
          styles.title,
          active ? styles.activeTitle : styles.inactiveTitle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeContainer: {
    backgroundColor: '#383838',
  },
  inactiveContainer: {
    backgroundColor: '#EFEFF0',
  },
  iconContainer: {
    marginRight: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
  activeTitle: {
    color: '#FFFFFF',
  },
  inactiveTitle: {
    color: '#383838',
  },
});
