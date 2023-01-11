import QuestionAnswer from '../components/QuestionAnswer';
import { Answer, LogEntry, useQuestion, useQuestionsDispatch } from '../store/QuestionContext';
import { RootStackScreenProps } from '../types';



export default function QuestionModalScreen({ route }: RootStackScreenProps<'QuestionModal'>) {
  const question = useQuestion(route.params.questionId);
  const dispatch = useQuestionsDispatch();

  const answerQuestion = (answer: LogEntry['answer']) => {
    if (!question) return;
    dispatch({type: 'ANSWERED_QUESTION', payload: {questionId: question.id, answer, timestamp: new Date()}})
  }

  const onYes = () => {
    answerQuestion(Answer.YES);
  }

  const onNo = () => {
    answerQuestion(Answer.NO);
  }

  const onSkip = () => {
    answerQuestion(Answer.SKIP);
  }

  return (
    question && <QuestionAnswer question={question} onYes={onYes} onNo={onNo} onSkip={onSkip} />
  )
}
