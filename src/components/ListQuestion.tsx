import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Question } from '../store/QuestionContext';

type ListQuestionProps = {
  question: Question
}

export function ListQuestion( { question }: ListQuestionProps ) {
  return (
      <Pressable onPress={() => alert(`You clicked on ${question.title}`)}>
        <View style={styles.listItem}>
          <Text>{question.title}</Text>
        </View>
      </Pressable>
  )
}

export function ListQuestionDelete() {
  return (
    <View style={[styles.listItem, {backgroundColor: 'red', alignItems: 'flex-end', paddingRight: 25}]}>
      <Text>Delete</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    backgroundColor: 'gray',
    margin: 4,
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
