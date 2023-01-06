import { StyleSheet, TextInput } from 'react-native';
import DatetimePicker from '../components/DatetimePicker';
import { Text, View } from '../components/Themed';




export default function NewQuestionScreen() {
  const example = 'create content today'
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Will you</Text>
        <TextInput placeholder={example} style={styles.input}/>
        <Text style={styles.title}>?</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Ask me this question</Text>
        <DatetimePicker />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  daySelection: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
  }
})
