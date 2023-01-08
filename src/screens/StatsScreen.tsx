import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import { FlatList, StyleSheet } from 'react-native'
import StatsCard from '../components/StatsCard'

import { Text, View } from '../components/Themed'
import { useQuestions } from '../store/QuestionContext'
import { QuestionStat, useStats } from '../store/StatsContext'

const testData: QuestionStat[] = [
  {
    questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bv',
    logEntries: [
      {
        date: new Date(),
        answer: 'yes',
      },
      {
        date: new Date(),
        answer: 'no',
      }
    ]
  },
  {
    questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    logEntries: [
      {
        date: new Date(),
        answer: 'no',
      }
    ]
  },
  {
    questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    logEntries: [
      {
        date: new Date(),
        answer: 'no',
      }
    ]
  }
]

export default function StatsScreen() {
  const stats = useStats();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <FlatList style={[styles.container, {paddingBottom: tabBarHeight + 50}]}  
      data={stats}
      renderItem={({item}) => <StatsCard questionStat={item}/>}
      ItemSeparatorComponent={() => <View style={{height: 20}} />}
      keyExtractor={(item) => item.questionId}
      showsVerticalScrollIndicator={false}
    />   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 36,
    width: '85%',
    alignSelf: 'center',
  },
})
