import { LogEntry, useQuestion, useQuestionsDispatch } from '../store/QuestionContext'
import { RootStackScreenProps } from '../types'
import QuestionAnswer from '../components/QuestionAnswer'



export default function QuestionModalScreen({ route }: RootStackScreenProps<'QuestionModal'>) {
  const question = useQuestion(route.params.questionId);
  const dispatch = useQuestionsDispatch();

  const answerQuestion = (answer: LogEntry['answer']) => {
    if (!question) return;
    dispatch({type: 'ANSWERED_QUESTION', payload: {questionId: question.id, answer, date: new Date()}})
  }

  const onYes = () => {
    answerQuestion('yes');
  }

  const onNo = () => {
    answerQuestion('no');
  }

  const onSkip = () => {
    answerQuestion('skip');
  }

  return (
    question && <QuestionAnswer question={question} onYes={onYes} onNo={onNo} onSkip={onSkip} />
  )
}
