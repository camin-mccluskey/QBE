import { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { exampleQuestionTitles } from '../constants/ExampleQuestions';
import useUuid from '../hooks/useUuid';
import { Question, QuestionSchedule, useQuestionsDispatch } from '../store/QuestionContext';
import DatetimePicker from './DatetimePicker';

export default function QuestionCreator() {
  const [draftQuestion, setDraftQuestion] = useState<Question | null>(null)
  const [placeholder, setPlaceholder] = useState<string>('')
  const dispatch = useQuestionsDispatch()
  
  useEffect(() => {
    setDraftQuestion({
      id: useUuid(),
      title: '',
      schedule: {
        days: [],
        time: new Date(),
      }
    });
    setPlaceholder(getExamplePlaceholder());
  }, [])

  useEffect(() => {
    if (!draftQuestion) return
    if (draftQuestion.title === '') {
      dispatch({ type: 'DELETED_QUESTION', payload: draftQuestion });
    } else {
      dispatch({ type: 'CREATED_OR_EDITED_QUESTION', payload: draftQuestion });
    }
  }, [draftQuestion]);

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
        <Text style={{fontSize: 16}}>Ask me this question</Text>
        <DatetimePicker questionSchedule={draftQuestion?.schedule} onEditQuestionSchedule={editQuestionSchedule}/>
      </View>
    </>
  )
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
