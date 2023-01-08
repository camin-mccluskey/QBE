import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import { FlatList, StyleSheet } from 'react-native'
import StatsCard from '../components/StatsCard'
import { View } from '../components/Themed'
import { useStats } from '../store/StatsContext'


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
