import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import { FlatList, StyleSheet } from 'react-native'
import NoQuestions from '../components/NoQuestions'
import StatsCard from '../components/StatsCard'
import { View } from '../components/Themed'
import { useQuestions } from '../store/QuestionContext'


export default function StatsScreen() {
  const questions = useQuestions();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
    {
      questions.length === 0 ? <NoQuestions />
        :
        <FlatList style={{paddingBottom: tabBarHeight + 50}}  
          data={questions}
          renderItem={({item}) => <StatsCard question={item}/>}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />  
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight * 2,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
})
