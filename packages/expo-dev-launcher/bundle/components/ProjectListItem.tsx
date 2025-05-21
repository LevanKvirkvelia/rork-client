import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useMemo } from 'react';

export type ProjectListItemProps = {
  id: string;
  title: string | null;
  slug: string;
  createdAt: string;
  editedAt: string;
  currentSnapshotId: string;
  productionUrl?: string;
  onPress?: () => void;
};

export function ProjectListItem(props: ProjectListItemProps) {
  const { title, onPress, productionUrl } = props;
  const iconLetterToDisplay = useMemo(
    () => (title ? title.charAt(0).toUpperCase() : 'P'),
    [title]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconLetter}>{iconLetterToDisplay}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title || 'Untitled Project'}
        </Text>
        {/* {running && (
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Running</Text>
          </View>
        )} */}
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
    backgroundColor: '#EFEFF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLetter: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4D4D4D',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4D4D4D',
    marginBottom: 4,
    marginRight: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#7EE477',
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#898A8D',
  },
  chevron: {
    marginLeft: 'auto',
  },
});
