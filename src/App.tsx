import { registerRootComponent } from 'expo';
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
import useNotificationPermissions from './hooks/useNotificationPermissions';
import notificationHandler from './utils/notificationHandler';

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
  const notificationPermissions = useNotificationPermissions(notificationHandler);

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
