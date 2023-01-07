import { StatusBar } from 'expo-status-bar'
import { Button, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import StreakDisplay from '../components/StreakDisplay'
import { Text, View } from '../components/Themed'
import { useQuestion } from '../store/QuestionContext'
import { RootStackScreenProps } from '../types'


export default function QuestionModalScreen({ route }: RootStackScreenProps<'QuestionModal'> ) {
  const question = useQuestion(route.params.questionId);

  return (
    <View style={styles.container}>
      <StreakDisplay fontSize={50} streak={5} />
      <Text style={styles.titleText}>{question?.title}</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>No</Text>
      </TouchableOpacity>
      <Button title="remind me later" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '33%',
    paddingHorizontal: '5%'
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: '10%'
  },
  button: {
    padding: 10,
    minWidth: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
  }
})
