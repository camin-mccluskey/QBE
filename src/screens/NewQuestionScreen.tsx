import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, View } from '../components/Themed';




export default function NewQuestionScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

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
        <View style={styles.daySelectionContainer}>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
          <View style={styles.daySelection}/>
        </View>
        <View>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal 
            isVisible={isDatePickerVisible}
            mode="time"
            date={new Date()}
            onCancel={hideDatePicker}
            onConfirm={handleConfirm}
          />
        </View>
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
