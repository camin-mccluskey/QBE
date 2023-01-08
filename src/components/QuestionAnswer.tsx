import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Button, Dimensions, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Question } from '../store/QuestionContext';
import QuestionCreator from './QuestionCreator';
import StreakDisplay from './StreakDisplay';

type QuestionAnswerProps = {
  question: Question;
  onYes: () => void;
  onNo: () => void;
  onSkip: () => void;
};


export default function QuestionAnswer({ question, onYes, onNo, onSkip }: QuestionAnswerProps) {
  const confettiRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const layoutAnimationConfig = {
    duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.scaleXY,
      delay: 150,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    // delete: {
    //   duration: 300,
    //   type: LayoutAnimation.Types.easeInEaseOut,
    //   property: LayoutAnimation.Properties.scaleX,
    // },
  };

  const toggleEditing = () => {
    LayoutAnimation.configureNext(layoutAnimationConfig);
    setIsEditing(!isEditing);
  }

  const handleYes = () => {
    confettiRef.current.start();
    onYes();
  }

  const handleNo = () => {
    onNo();
  }

  const handleSkip = () => {
    onSkip();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editIconContainer} onPress={toggleEditing}>
        <Ionicons name="pencil-outline" size={26} style={[styles.editIcon, isEditing ? {color: 'blue'}: {}]} />
      </TouchableOpacity>
      <StreakDisplay fontSize={50} streak={5} />
      
      { isEditing ?
        <QuestionCreator question={question}/>     
        :
        <>
          <Text style={styles.titleText}>Will you {question?.title}?</Text>
          <TouchableOpacity style={styles.button} onPress={handleYes}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNo}>
            <Text>No</Text>
          </TouchableOpacity>
          <Button title="remind me later" onPress={handleSkip}/>
          <ConfettiCannon 
            count={100} origin={{x: Dimensions.get('screen').width / 2, y: -20}} autoStart={false}
            fallSpeed={2000} ref={confettiRef} fadeOut 
          />
        </>
      }

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '33%',
    paddingHorizontal: '5%'
  },
  editIconContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  editIcon: {
    color: 'white',
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    minWidth: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
  }
})