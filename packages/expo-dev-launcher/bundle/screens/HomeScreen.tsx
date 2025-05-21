import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Header } from '../components/Header';
import { HomePlaceHolder } from '../components/HomePlaceHolder';
import { Button } from '../components/Button';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { StackNavigatorParamList } from '../App';
import {
  ProjectListItem,
  type ProjectListItemProps,
} from '../components/ProjectListItem';
import { Pill } from '../components/Pill';
import { useAuth } from '../providers/AuthProvider';
import { useQuery } from 'react-query';
import { fetchProjectsAPI } from '../utils/api';
import { handleOpenApp } from '../utils/app';
import { useCallback, useLayoutEffect, useState, useMemo } from 'react';
import { useRecentlyOpened } from '../hooks/useRecentlyOpened';

export function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Main'>>();
  const { session } = useAuth();
  const [activePill, setActivePill] = useState('Created');
  const { recentlyOpened } = useRecentlyOpened();

  const { data: projects } = useQuery<ProjectListItemProps[], Error>(
    ['projects', session?.user?.id],
    async () => fetchProjectsAPI(session.access_token),
    {
      enabled: !!session?.access_token,
      onError: (error) => {
        console.error('Failed to fetch projects:', error);
      },
    }
  );

  const filteredProjects = useMemo(
    () => projects?.filter((project) => project.productionUrl) || [],
    [projects]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header enableSearch={true} title="My Projects" />,
      headerShown: true,
    });
  }, [navigation]);

  const onSignInPressed = () => {
    navigation.navigate('Login');
  };

  const recentlyOpenedProjects = useMemo(() => {
    return recentlyOpened.map((url) => ({
      id: url,
      title: url,
      productionUrl: url,
      slug: url,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
      currentSnapshotId: 'n/a',
    }));
  }, [recentlyOpened]);

  const renderProjectItem = useCallback(
    ({ item }: { item: ProjectListItemProps }) => (
      <ProjectListItem
        {...item}
        onPress={() => handleOpenApp(item.productionUrl)}
      />
    ),
    []
  );

  const renderRecentlyOpenedItem = useCallback(
    ({ item }: { item: ProjectListItemProps }) => (
      <ProjectListItem
        {...item}
        onPress={() => handleOpenApp(item.productionUrl)}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.pillsContainer}>
        <Pill
          title="Created"
          icon="Hammer"
          active={activePill === 'Created'}
          onPress={() => setActivePill('Created')}
        />
        <Pill
          title="Saved"
          icon="Bookmark"
          active={activePill === 'Saved'}
          onPress={() => setActivePill('Saved')}
        />
        <Pill
          title="Shared"
          icon="Share"
          active={activePill === 'Shared'}
          onPress={() => setActivePill('Shared')}
        />
      </View>
      {projects && projects.length > 0 ? (
        <FlatList
          data={filteredProjects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          style={styles.projectList}
        />
      ) : (
        <HomePlaceHolder />
      )}

      {recentlyOpened && recentlyOpened.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Recently Opened</Text>
          <FlatList
            data={recentlyOpenedProjects}
            renderItem={renderRecentlyOpenedItem}
            keyExtractor={(item) => item.id}
            style={styles.projectList}
          />
        </View>
      )}

      {!session && !session?.user ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Sign in to view your projects"
            onPress={onSignInPressed}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  projectList: {
    backgroundColor: '#FAFAFA',
    flexGrow: 0,
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
    marginLeft: 12,
  },
});
