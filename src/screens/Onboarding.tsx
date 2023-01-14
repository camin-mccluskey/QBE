import Constants from 'expo-constants';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useOnboarded from '../hooks/useUserOnboarded';
import { RootStackScreenProps } from '../types';

export default function Onboarding({ navigation }: RootStackScreenProps<'Onboarding'>) {
  const [, setUserOnboarded] = useOnboarded();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const onboardingComplete = () => {
    setUserOnboarded(true);
    navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center', height: '75%', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Pick your streak goal</Text>
        <FlatList 
          data={[
            {days: 3, text: 'Baby steps'},
            {days: 7, text: 'Strong start'},
            {days: 14, text: 'Clearly committed'},
            {days: 30, text: 'Unstoppable streak'},
          ]}
          renderItem={({ item, index }) => (
            <StreakSelectorRow
              days={item.days} text={item.text} 
              isSelected={index === selectedIdx}
              toggleSelected={() => setSelectedIdx(selectedIdx === index ? null : index)} 
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          style={{flexGrow: 0, width: '100%'}}
        />
      </View>
      <TouchableOpacity
        onPress={onboardingComplete}
        style={[styles.button, selectedIdx === null && {backgroundColor: 'lightgray'}]}
        disabled={selectedIdx === null}
      >
        <Text style={{color: 'white'}}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const StreakSelectorRow = ({ days, text, isSelected, toggleSelected }: {days: number, text: string, isSelected: boolean, toggleSelected: () => void }) => {

  return (
    <TouchableOpacity 
      style={[styles.streakSelectorRowContainer, isSelected && styles.selectedStreakSelectorRow]}
      onPress={() => toggleSelected()}
    >
      <Text style={[styles.streakSelectorRowText, isSelected && styles.selectedStreakSelectorRowText]}>
        {days} days
      </Text>
      <Text style={isSelected && styles.selectedStreakSelectorRowText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    marginTop: '20%',
    marginBottom: '20%',
    height: '100%',
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  streakSelectorRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedStreakSelectorRow: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  selectedStreakSelectorRowText: {
    color: 'blue',
  },
  streakSelectorRowText: {
    fontWeight: 'bold',
  },
});
