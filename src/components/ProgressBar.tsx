import { View, StyleSheet } from 'react-native';
import { Stats } from '../hooks/useStats';

export default function ProgressBar({ stats }: { stats: Stats }) {
  const { totalYes, totalNo, totalSkipped } = stats;
  const total = totalYes + totalNo + totalSkipped;

  const yesFraction = totalYes / total;
  const noFraction = totalNo / total;
  const skippedFraction = totalSkipped / total;

  return (
    <View style={styles.container}>
      <View style={{flex: yesFraction || 0, backgroundColor: 'green', borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}></View>
      <View style={{flex: skippedFraction || 0, backgroundColor: 'gray'}}></View>
      <View style={{flex: noFraction || 0, backgroundColor: 'red', borderTopRightRadius: 5, borderBottomRightRadius: 5}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 10,
  },
});
