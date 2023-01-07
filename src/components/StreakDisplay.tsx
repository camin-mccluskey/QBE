import { StyleSheet, Text, View } from 'react-native';

export default function StreakDisplay({ fontSize, streak }: { fontSize: number, streak: number }) {
  return (
    <View style={styles.streakContainer}>
      <Text style={{fontSize, paddingBottom: 5}}>🔥</Text>
      <Text style={{fontSize, color: 'white' }}>{streak}</Text>
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
