import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import { Question } from '../store/QuestionContext';

type ListQuestionProps = {
  question: Question
}

export function ListQuestion( { question }: ListQuestionProps ) {
  return (
      <TouchableHighlight onPress={() => alert(`You clicked on ${question.title}`)}>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.streakContainer}>
              <Text>🔥</Text>
              <Text>6</Text>
            </View>
            <View>
              <Text style={styles.text}>{question.title}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{backgroundColor: 'white', height: 10, width: 10}}/>
                <View style={{backgroundColor: 'white', height: 10, width: 10}}/>
                <View style={{backgroundColor: 'white', height: 10, width: 10}}/>
              </View>
            </View>
          </View>
          <Text>2d 14hrs</Text>
        </View>
      </TouchableHighlight>
  )
}

export function ListQuestionDelete() {
  return (
    <View style={[styles.listItem, {backgroundColor: 'red', justifyContent: 'flex-end', alignItems: 'center'}]}>
      <Ionicons name="trash" size={24} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 65,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  streakContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingRight: 10,
  }
});
