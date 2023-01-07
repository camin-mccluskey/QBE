import QuestionCreator from '../components/QuestionCreator'
import { StyleSheet, View } from 'react-native'
import { QuestionContextProvider } from '../store/QuestionContext'


export default function NewQuestionScreen() {
  return (
    <QuestionContextProvider>
      <View style={styles.container}>
        <QuestionCreator />
      </View>
    </QuestionContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
