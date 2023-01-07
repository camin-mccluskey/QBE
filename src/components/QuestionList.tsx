import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/Themed';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useQuestions, useQuestionsDispatch } from '../store/QuestionContext';
import { ListQuestion, ListQuestionDelete } from './ListQuestion';

export default function QuestionList() {
  const questions = useQuestions();
  const dispatch = useQuestionsDispatch();

  const deleteQuestion = (questionId: string) => {
    const question = questions.find((question) => question.id === questionId);
    if (question) {
      dispatch({ type: 'DELETED_QUESTION', payload: question });
    }
  }

  return (
    <View style={styles.container}>
      {questions.length === 0 && <Text>No questions yet</Text>}
      <SwipeListView
        useFlatList={true}
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListQuestion question={item} /> }
        renderHiddenItem={() => <ListQuestionDelete /> }
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