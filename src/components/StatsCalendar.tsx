import { StyleSheet, View } from 'react-native';
import { LogEntry } from '../store/QuestionContext';

export default function StatsCalendar({ logs }: { logs: LogEntry[] }) {

  return (
    <View style={styles.container}>
      <>
      {[...Array(Math.max(31 - logs.length, 0)).keys()].map((idx) => (
        <DayEntry key={idx} />
      ))}
      {
        logs.slice(-31).map((log, idx) => (
          <DayEntry key={idx} log={log} />
        ))
      }
      </>
    </View>
  )
}

const DayEntry = ({ key, log }: { key: number, log?: LogEntry }) => {
  const style = log?.answer === 'yes' ? {backgroundColor: 'green'} : log?.answer === 'no' ? {backgroundColor: 'red'} : {backgroundColor: 'gray'};
  return (
    // todo - return when we have locked in what answers can be
    <View key={key} style={[styles.dayEntry, style]}/>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10
  },
  dayEntry: {
    width: '12.5%',
    height: 0,
    aspectRatio: 1,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 5
  },
});
 