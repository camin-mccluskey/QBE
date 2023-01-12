import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { Platform, UIManager } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QuestionContextProvider } from './store/QuestionContext';
import DismissKeyboard from './components/DismissKeyboard';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QuestionContextProvider>
          <RootSiblingParent>
            <DismissKeyboard>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </DismissKeyboard>
          </RootSiblingParent>
      </QuestionContextProvider>
    );
  }
}

registerRootComponent(App);
