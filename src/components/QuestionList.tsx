import Constants from 'expo-constants';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useQuestions, useQuestionsDispatch } from '../store/QuestionContext';
import NoQuestions from './NoQuestions';
import { ListQuestion, ListQuestionDelete } from './ListQuestion';

export default function QuestionList() {
  const questions = useQuestions();
  const dispatch = useQuestionsDispatch();

  const layoutAnimationConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 250,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
  
  const deleteQuestion = (questionId: string) => {
    const question = questions.find((question) => question.id === questionId);
    if (question) {
      dispatch({ type: 'DELETED_QUESTION', payload: question });
      LayoutAnimation.configureNext(layoutAnimationConfig);
    }
  }

  return (
    <View style={styles.container}>
      {questions.length === 0 && (
        <NoQuestions />
      )}
      <SwipeListView
        useFlatList={true}
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListQuestion question={item} /> }
        renderHiddenItem={() => <ListQuestionDelete /> }
        ItemSeparatorComponent={() => <View style={{height: 20, width: '100%'}} />}
        recalculateHiddenLayout
        disableRightSwipe
        friction={10}
        useAnimatedList
        
        // swipe left so row opens to the right
        rightActivationValue={-200}
        onRightActionStatusChange={({ key }) => deleteQuestion(key)}
      />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    width: '90%',
  },
});