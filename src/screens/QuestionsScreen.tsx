import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import QuestionList from '../components/QuestionList';

import { View } from '../components/Themed';
import { QuestionContextProvider } from '../store/QuestionContext';
import { RootTabScreenProps } from '../types';


export default function QuestionsScreen({ navigation }: RootTabScreenProps<'Questions'>) {
  return (
    <QuestionContextProvider>
      <View style={styles.container}>
        <QuestionList />
      </View>
    </QuestionContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    width: '100%',
  },
})
