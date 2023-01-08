import { StyleSheet, Text, View } from 'react-native';
import { useQuestion } from '../store/QuestionContext';
import { QuestionStat } from '../store/StatsContext';

export default function StatsCard({ questionStat }: { questionStat: QuestionStat }) {
  const question = useQuestion(questionStat.questionId)
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>Will you {question?.title}?</Text>
      <View>
        {/* progress bar */}
        <View style={{flexDirection: 'row', height: 10}}>
          <View style={{flex: 3, backgroundColor: 'green', borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}></View>
          <View style={{flex: 2, backgroundColor: 'gray'}}></View>
          <View style={{flex: 1, backgroundColor: 'red', borderTopRightRadius: 5, borderBottomRightRadius: 5}}></View>
        </View>
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
    padding: 10,
    borderRadius: 10,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
  },
});
