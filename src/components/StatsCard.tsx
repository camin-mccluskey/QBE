import { StyleSheet, Text, View } from 'react-native'
import useStats from '../hooks/useStats'
import { Question } from '../store/QuestionContext'

export default function StatsCard({ question }: { question: Question }) {
  const stats = useStats(question)
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>Will you {question?.title}?</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'darkslategray',
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: { width: -1, height: -1 },
            borderRadius: 10,
            flexBasis: 1,
          }}
        >
          <Text style={styles.subtitle}>Streak</Text>
          <Text style={styles.subtitle}>{stats.streak}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'darkslategray',
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: { width: -1, height: -1 },
            borderRadius: 10,
            flexBasis: 1,
          }}
        >
          <Text style={styles.subtitle}>Yes %</Text>
          <Text style={styles.subtitle}>
            {stats.totalYes} / {stats.totalYes + stats.totalNo + stats.totalSkipped}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
    width: '100%',
  },
  subtitle: {
    fontSize: 15,
    // fontWeight: 'thin',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
})
