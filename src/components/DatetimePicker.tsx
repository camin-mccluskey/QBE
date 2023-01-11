import { useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DAYMAP } from '../constants/DayMap';
import { QuestionSchedule } from '../store/QuestionContext';

type DatetimePickerProps = {
  questionSchedule: QuestionSchedule | undefined;
  onEditQuestionSchedule: (questionSchedule: QuestionSchedule) => void;
}

const DatetimePicker = ({ questionSchedule, onEditQuestionSchedule }: DatetimePickerProps) => {
  const days = questionSchedule?.days || [];
  const time = questionSchedule?.time || new Date();

  const onEditDays = (selectedDays: number[]) => {
    onEditQuestionSchedule({
      days: selectedDays,
      time,
    })
  }

  const onEditDatetime = (newDatetime: Date) => {
    onEditQuestionSchedule({
      days,
      time: newDatetime,
    })
  }

  return (
    <View style={{paddingTop: 10}}>
    <DayPicker days={days} onEditDays={onEditDays} />
    <TimePicker time={time} onEditDatetime={onEditDatetime} />
    </View>
  );
}

const DayPicker = ({ days, onEditDays }: { days: number[], onEditDays: (selectedDays: number[]) => void }) => {

  const onPressDay = (dayMapKey: number) => {
    if (days.includes(dayMapKey)) {
      onEditDays(days.filter((selectedDay) => selectedDay !== dayMapKey));
    } else {
      onEditDays([...days, dayMapKey]);
    }
  }

  return (
    <View style={styles.daySelectionContainer}>
      {
        Object.entries(DAYMAP).map(([k, dayLetter]) => {
          const key = parseInt(k);
          return (
            <TouchableOpacity 
              onPress={() => onPressDay(key)}
              key={key}
              style={[styles.daySelection, days.includes(key) ? {backgroundColor: 'blue'} : {backgroundColor: 'gray'}]}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>{dayLetter}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

const TimePicker = ({ time, onEditDatetime }: { time: Date, onEditDatetime: (newDatetime: Date) => void }) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const btnTitle = `at ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const showDatePicker = () => {
    setTimePickerVisible(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onEditDatetime(date);
    hideDatePicker();
  };
  

  return (
    <View>
      <Button title={btnTitle} onPress={showDatePicker} />
      <DateTimePickerModal 
        isVisible={isTimePickerVisible}
        mode="time"
        date={time}
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  daySelection: {
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 5,
  }
})

export default DatetimePicker;