import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { exampleQuestionTitles } from '../constants/ExampleQuestions';
import useUuid from '../hooks/useUuid';
import { Question, QuestionSchedule, useQuestionsDispatch } from '../store/QuestionContext';
import DatetimePicker from './DatetimePicker';
import Toast from 'react-native-root-toast';

export default function QuestionCreator() {
  const [draftQuestion, setDraftQuestion] = useState<Question | null>(null)
  const [placeholder, setPlaceholder] = useState<string>('')
  const isFocused = useIsFocused();
  const dispatch = useQuestionsDispatch()

  const questionInvalid = draftQuestion?.title === '' || draftQuestion?.schedule === null;
  
  useEffect(() => {
    setDraftQuestion(genNewDraftQuestion());
    setPlaceholder(getExamplePlaceholder());
  }, [])

  useEffect(() => {
    if (!draftQuestion) return
    if (questionInvalid) {
      dispatch({ type: 'DELETED_QUESTION', payload: draftQuestion });
    } else {
      const fullQuestionTitle = `Will you ${draftQuestion.title}?`
      dispatch({ type: 'CREATED_OR_EDITED_QUESTION', payload: {...draftQuestion, title: fullQuestionTitle}});
    }
  }, [draftQuestion]);

  useEffect(() => {
    // user navigated away from this screen
    if (!isFocused) {
      if (!questionInvalid) {
        Toast.show('question saved', { duration: Toast.durations.SHORT, position: 60 })
      }
    }
    setDraftQuestion(genNewDraftQuestion());
  }, [isFocused]);

  const editQuestionTitle = (title: string) => {
    if (!draftQuestion) return
    setDraftQuestion({...draftQuestion, title})
  }

  const editQuestionSchedule = (schedule: QuestionSchedule) => {
    if (!draftQuestion) return
    setDraftQuestion({...draftQuestion, schedule})
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
      <View style={{alignItems: 'center', paddingTop: 40}}>
        <Text style={{fontSize: 16, color: 'gray'}}>Ask me this question</Text>
        <DatetimePicker questionSchedule={draftQuestion?.schedule} onEditQuestionSchedule={editQuestionSchedule}/>
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
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 24,
    minWidth: 200,
    maxWidth: 200,
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
    width: '75%',
  }
})
