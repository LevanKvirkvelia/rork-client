import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LucideProps } from 'lucide-react-native';

type ButtonVariant = 'default' | 'outlined';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  icon?: React.ComponentType<LucideProps> | React.ReactElement;
  iconColor?: string;
}

export function Button({
  title,
  variant = 'default',
  icon: Icon,
  iconColor,
  style,
  ...rest
}: ButtonProps) {
  const selectedVariantStyles = variantStyles[variant];

  const containerStyle: StyleProp<ViewStyle>[] = [
    styles.container,
    selectedVariantStyles.container,
  ];
  const textStyle: StyleProp<TextStyle>[] = [
    styles.text,
    selectedVariantStyles.text,
  ];

  const finalIconColor = iconColor ?? selectedVariantStyles.iconColor;

  return (
    <TouchableOpacity style={[containerStyle, style]} {...rest}>
      <View style={styles.iconContainer}>
        {Icon &&
          (React.isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon size={20} color={finalIconColor} />
          ))}
      </View>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 50,
    width: '100%',
  },
  defaultContainer: {
    backgroundColor: '#000000',
  },
  outlinedContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  defaultText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: '#000000',
  },
  iconContainer: {
    marginRight: 4,
  },
});

const variantStyles = {
  default: {
    container: styles.defaultContainer,
    text: styles.defaultText,
    iconColor: '#FFFFFF',
  },
  outlined: {
    container: styles.outlinedContainer,
    text: styles.outlinedText,
    iconColor: '#000000',
  },
};
