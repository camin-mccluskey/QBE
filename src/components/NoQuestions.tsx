import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';


export default function NoQuestions() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const bounce = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }

  useEffect(() => {
    bounce();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>add a question</Text>
      <Animated.View style={{transform: [{translateY: bounceAnim}]}}>
        <Ionicons name="arrow-down-outline" size={50} color='white' />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateY: -50}],
  },
  text: {
    fontSize: 22,
    color: 'white',
  }
});