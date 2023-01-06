import { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatetimePicker: React.FC = () => {
  return (
    <>
    <DayPicker />
    <TimePicker />
    </>
  );
}

const DayPicker = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = {
    0: 'M',
    1: 'T',
    2: 'W',
    3: 'T',
    4: 'F',
    5: 'S',
    6: 'S',
  }

  return (
    <View style={styles.daySelectionContainer}>
      {
        Object.entries(days).map(([key, dayLetter]) => {
          return (
            <View 
              onTouchEnd={() => {
                if (selectedDays.includes(key)) {
                  setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== key))
                } else {
                  setSelectedDays([...selectedDays, key])
                }
              }}
              key={key}
              style={[styles.daySelection, selectedDays.includes(key) ? {backgroundColor: 'blue'} : {backgroundColor: 'gray'}]}
            >
              <Text>{dayLetter}</Text>
            </View>
          )
        })
      }
    </View>
  );
}

const TimePicker = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const btnTitle = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const showDatePicker = () => {
    setTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setTime(date);
    hideDatePicker();
  };
  

  return (
    <View>
      <Button title={btnTitle} onPress={showDatePicker} />
      <DateTimePickerModal 
        isVisible={isTimePickerVisible}
        mode="time"
        date={new Date()}
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  daySelection: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
  }
})

export default DatetimePicker;