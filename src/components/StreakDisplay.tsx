import { StyleSheet, Text, View } from 'react-native';
import AnimateNumber from 'react-native-animate-number-renewed';


export default function StreakDisplay({ fontSize, streak }: { fontSize: number, streak: number }) {
  return (
    <View style={styles.streakContainer}>
      <Text style={{fontSize, paddingBottom: 5}}>{streak === 0 ? '🪵' : '🔥' }</Text>
      <AnimateNumber value={streak} countBy={1} initial={0} style={{color: 'white', fontSize}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  streakContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
});
