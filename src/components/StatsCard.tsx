import { StyleSheet, Text, View } from 'react-native';
import useStats from '../hooks/useStats';
import { Question } from '../store/QuestionContext';
import ProgressBar from './ProgressBar';

export default function StatsCard({ question }: { question: Question }) {
  const stats = useStats(question);
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>Will you {question?.title}?</Text>
      <View>
        {/* progress bar */}
        <ProgressBar stats={stats}/>
        {/* calander view */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10}}>
          {[...Array(31).keys()].map((idx) => (
            <View 
              key={idx}
              style={{width: '12.5%', height: 0, aspectRatio: 1, backgroundColor: 'white', margin: 2, borderRadius: 5}}
            />
          ))}
        </View>
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
