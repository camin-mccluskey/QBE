import { StyleSheet, View } from 'react-native'
import QuestionCreator from '../components/QuestionCreator'


export default function NewQuestionScreen() {
  return (
    <View style={styles.container}>
      <QuestionCreator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
