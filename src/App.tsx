import { registerRootComponent } from 'expo';
import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { Platform, UIManager } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QuestionContextProvider } from './store/QuestionContext';
import DismissKeyboard from './components/DismissKeyboard';
import useUserOnboarded from './hooks/useUserOnboarded';
import { useEffect, useState } from 'react';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const [isUserOnboarded] = useUserOnboarded();
  const colorScheme = useColorScheme();
  const [notificationPermissions, setNotificationPermissions] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermissions(status);
    return status;
  };

  // todo - this is the place we do the deep linking
  const handleNotification = (notification: Notification) => {
    const { title } = notification.request.content;
    console.warn(title);
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QuestionContextProvider>
          <RootSiblingParent>
            <DismissKeyboard>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} userOnboarded={isUserOnboarded}/>
                <StatusBar />
              </SafeAreaProvider>
            </DismissKeyboard>
          </RootSiblingParent>
      </QuestionContextProvider>
    );
  }
}

registerRootComponent(App);
