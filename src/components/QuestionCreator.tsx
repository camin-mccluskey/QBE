import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { exampleQuestionTitles } from '../constants/ExampleQuestions'
import useUuid from '../hooks/useUuid'
import { Question, QuestionSchedule, useQuestionsDispatch } from '../store/QuestionContext'
import DatetimePicker from './DatetimePicker'

type QuestionCreatorProps = {
  question?: Question
}

export default function QuestionCreator({ question }: QuestionCreatorProps) {
  const [draftQuestion, setDraftQuestion] = useState<Question | undefined>(question)
  const [placeholder, setPlaceholder] = useState<string>('')
  const dispatch = useQuestionsDispatch()
  const navigation = useNavigation()

  const questionInvalid = draftQuestion?.title === '' || draftQuestion?.schedule.days.length === 0

  useEffect(() => {
    if (!draftQuestion) {
      setDraftQuestion(genNewDraftQuestion())
      setPlaceholder(getExamplePlaceholder())
    }
  }, [])

  const editQuestionTitle = (title: string) => {
    if (!draftQuestion) return
    setDraftQuestion({ ...draftQuestion, title })
  }

  const editQuestionSchedule = (schedule: QuestionSchedule) => {
    if (!draftQuestion) return
    setDraftQuestion({ ...draftQuestion, schedule })
  }

  const saveQuestion = () => {
    if (!draftQuestion || questionInvalid) return
    dispatch({ type: 'CREATED_OR_EDITED_QUESTION', payload: draftQuestion })
    navigation.navigate('Root', { screen: 'Questions' })
  }

  const getExamplePlaceholder = () => {
    return exampleQuestionTitles[Math.floor(Math.random() * exampleQuestionTitles.length)]
  }

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Will you</Text>
        <TextInput
          autoCapitalize='none'
          onChangeText={(e) => editQuestionTitle(e)}
          placeholder={placeholder}
          style={styles.input}
          value={draftQuestion?.title}
        />
        <Text style={styles.title}>?</Text>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <Text style={{ fontSize: 16, color: 'gray' }}>Ask me this question</Text>
        <DatetimePicker
          questionSchedule={draftQuestion?.schedule}
          onEditQuestionSchedule={editQuestionSchedule}
        />
        <Pressable
          onPress={saveQuestion}
          disabled={questionInvalid}
          style={questionInvalid ? styles.disabledButton : styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </>
  )
}

function genNewDraftQuestion(): Question {
  return {
    id: useUuid(),
    title: '',
    schedule: {
      days: [],
      time: new Date(),
    },
    logs: [],
    createdAt: new Date(),
    notificationIds: [],
  }
}

const styles = StyleSheet.create({
  disabledButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 24,
    minWidth: 250,
    maxWidth: 250,
  },
  daySelection: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
