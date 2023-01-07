import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import DatetimePicker from '../components/DatetimePicker';
import { Text, View } from '../components/Themed';
import { exampleQuestionTitles } from '../constants/ExampleQuestions';
import useUuid from '../hooks/useUuid';
import { Question, QuestionSchedule } from '../store/QuestionContext';


export default function NewQuestionScreen() {
  const [draftQuestion, setDraftQuestion] = useState<Question | null>(null)
  const [placeholder, setPlaceholder] = useState<string>('')
  
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
    return () => {
      // save or delete question
    }
  }, [])

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

  // debouce autosave - maybe 1 or 2 seconds
  // should delete question if title is empty
  // should save question if title is not empty with debounce as mentioned
  // how can we tell if we should save a question for the first time vs update an existing question? - maybe start with a btn to save
  // should save question when user navigates away from screen - if that happens before debounce time
  // actually, maybe we should just save the question when the user navigates away from the screen and show a little toast message to let them know it was saved

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
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
