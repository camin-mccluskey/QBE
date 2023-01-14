import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import useOnboarded from '../hooks/useUserOnboarded';
import { RootStackScreenProps } from '../types';

export default function Onboarding({ navigation }: RootStackScreenProps<'Onboarding'>) {
  const [_, setUserOnboarded] = useOnboarded();

  const onboardingComplete = () => {
    setUserOnboarded(true);
    navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <TouchableOpacity onPress={onboardingComplete} style={styles.button}>
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '75%',
    alignItems: 'center',
  },
});
