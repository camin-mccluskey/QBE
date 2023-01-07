import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { Button, Dimensions, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import StreakDisplay from '../components/StreakDisplay'
import { Text, View } from '../components/Themed'
import { useQuestion } from '../store/QuestionContext'
import { RootStackScreenProps } from '../types'
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRef } from 'react'
import Constants from 'expo-constants'


export default function QuestionModalScreen({ route }: RootStackScreenProps<'QuestionModal'>) {
  const question = useQuestion(route.params.questionId);
  const confettiRef = useRef(null);

  const onYes = () => {
    if (confettiRef.current) {
      confettiRef.current.start();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editIconContainer}>
        <Ionicons name="pencil-outline" size={24} style={styles.editIcon} />
      </TouchableOpacity>
      <StreakDisplay fontSize={50} streak={5} />
      <Text style={styles.titleText}>{question?.title}</Text>
      <TouchableOpacity style={styles.button} onPress={onYes}>
        <Text>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>No</Text>
      </TouchableOpacity>
      <Button title="remind me later" />
      <ConfettiCannon 
        count={100} origin={{x: Dimensions.get('screen').width / 2, y: 0}} autoStart={false}
        ref={confettiRef} fadeOut 
      />

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
  editIconContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  editIcon: {
    color: 'white',
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
