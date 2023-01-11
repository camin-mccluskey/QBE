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

const DayEntry = ({ log }: { log?: LogEntry }) => {
  let style = {backgroundColor: 'white'};
  
  if (log?.answer == 'yes') {
    style = {backgroundColor: 'green'};
  } else if (log?.answer == 'no') {
    style = {backgroundColor: 'red'};
  } else if (log?.answer == 'skip') {
    style = {backgroundColor: 'gray'};
  }
  
  return (
    <View style={[styles.dayEntry, style]}/>
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
 