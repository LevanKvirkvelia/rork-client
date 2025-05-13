import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useMemo } from 'react';

export type ProjectListItemProps = {
  title: string;
  running?: boolean;
  onPress?: () => void;
  url: string;
};

export function ProjectListItem(props: ProjectListItemProps) {
  const { title, running, onPress, url } = props;
  const iconLetterToDisplay = useMemo(
    () => title.charAt(0).toUpperCase(),
    [title]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconLetter}>{iconLetterToDisplay}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {running && (
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Running</Text>
          </View>
        )}
      </View>
      <ChevronRight size={20} color="#838383" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D4D4D',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4D4D4D',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#898A8D',
  },
  chevron: {
    marginLeft: 'auto',
  },
});
