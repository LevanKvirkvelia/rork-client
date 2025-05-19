import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Header } from '../components/Header';
import { HomePlaceHolder } from '../components/HomePlaceHolder';
import { Button } from '../components/Button';
import { View, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../App';
import {
  ProjectListItem,
  ProjectListItemProps,
} from '../components/ProjectListItem';
import { Pill } from '../components/Pill';
import { useAuth } from '../providers/AuthProvider';
import { useQuery } from 'react-query';
import { fetchProjectsAPI } from '../utils/api';
import { handleOpenApp } from '../utils/app';
import { useCallback, useLayoutEffect, useState } from 'react';

export function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Main'>>();
  const { session } = useAuth();
  const [activePill, setActivePill] = useState('Created');

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

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header enableSearch={true} title="My Projects" />,
      headerShown: true,
    });
  }, [navigation]);

  const onSignInPressed = () => {
    navigation.navigate('Login');
  };

  const renderProjectItem = useCallback(
    ({ item }: { item: ProjectListItemProps }) => (
      <ProjectListItem
        {...item}
        onPress={() => handleOpenApp(item.productionUrl)}
      />
    ),
    [handleOpenApp]
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
          data={projects || []}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          style={styles.projectList}
        />
      ) : (
        <HomePlaceHolder />
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
  },
  pillsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
});
