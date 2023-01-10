import { StyleSheet, Text, View } from 'react-native';
import useStats from '../hooks/useStats';
import { Question } from '../store/QuestionContext';
import ProgressBar from './ProgressBar';
import StatsCalendar from './StatsCalendar';

export default function StatsCard({ question }: { question: Question }) {
  const stats = useStats(question);
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>Will you {question?.title}?</Text>
      <View>
        <ProgressBar stats={stats}/>
        <StatsCalendar logs={question.logs} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
  },
});
