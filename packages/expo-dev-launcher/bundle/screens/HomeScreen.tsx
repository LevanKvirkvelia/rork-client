import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Header } from '../components/Header';
import { HomePlaceHolder } from '../components/HomePlaceHolder';
import { Button } from '../components/Button';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../App';
import { loadApp } from '../native-modules/DevLauncherInternal';
import {
  ProjectListItem,
  ProjectListItemProps,
} from '../components/ProjectListItem';
import { Pill } from '../components/Pill';
import { useAuth } from '../providers/AuthProvider';

const projects: ProjectListItemProps[] = [
  { title: 'Calory Tracker', running: false, url: 'exp://127.0.0.1:8081' },
  { title: 'Music Player', running: true, url: 'exp://127.0.0.1:8081' },
];

export function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParamList, 'Main'>>();
  const { session } = useAuth();
  const [activePill, setActivePill] = React.useState('Created');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header enableSearch={true} title="My Projects" />,
      headerShown: true,
    });
  }, [navigation]);

  const onSignInPressed = () => {
    navigation.navigate('Login');
  };

  const handleOpenApp = async (url: string) => {
    if (url) {
      try {
        await loadApp(url);
      } catch (error) {
        console.error('Failed to open app:', error);
        Alert.alert(
          'Error',
          'Failed to open app. Check the console for more details.'
        );
      }
    }
  };

  const renderProjectItem = ({ item }: { item: ProjectListItemProps }) => (
    <ProjectListItem
      title={item.title}
      running={item.running}
      url={item.url}
      onPress={() => handleOpenApp(item.url)}
    />
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
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.url + item.title}
        style={styles.projectList}
        ListEmptyComponent={<HomePlaceHolder />}
      />
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
