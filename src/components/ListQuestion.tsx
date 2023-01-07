import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import { DAYMAP } from '../constants/DayMap';
import { Question } from '../store/QuestionContext';
import StreakDisplay from './StreakDisplay';

type ListQuestionProps = {
  question: Question
}

export function ListQuestion( { question }: ListQuestionProps ) {
  const { title, schedule } = question;
  const { days } = schedule;
  const navigation = useNavigation();

  const activeDays = Object.entries(DAYMAP).map(([k, dayLetter]) => {
    const key = parseInt(k);
    return (
      <View
        key={key}
        style={{
          height: 20, width: 20, borderRadius: 3, 
          padding: 2, margin: 3,
          backgroundColor: days.includes(key) ? 'blue' : 'gray',
          justifyContent: 'center', alignItems: 'center'
        }}
      >
        <Text>{dayLetter}</Text>
      </View>
      )
  });  

  return (
      <TouchableHighlight onPress={() => navigation.navigate('QuestionModal', { questionId: question.id})}>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <StreakDisplay fontSize={16} streak={6}/>
            <View>
              <Text style={styles.title}>Will you {title}?</Text>
              <View style={{flexDirection: 'row'}}>
                {activeDays}
              </View>
            </View>
          </View>
          {/* <View style={{justifyContent: 'center'}}>
            <Text>2d 14hrs</Text>
          </View> */}
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
    height: 75,
    width: '100%',
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkgray',
    shadowColor: 'gray',
  },
  title: {
    fontSize: 18,
    paddingBottom: 4,
    color: 'white',
    fontWeight: '600',
  },
});
