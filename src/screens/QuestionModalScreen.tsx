import { useQuestion } from '../store/QuestionContext'
import { RootStackScreenProps } from '../types'
import QuestionAnswer from '../components/QuestionAnswer'



export default function QuestionModalScreen({ route }: RootStackScreenProps<'QuestionModal'>) {
  const question = useQuestion(route.params.questionId);

  const onYes = () => {
    console.log('yes - persist to db')
  }

  const onNo = () => {
    console.log('no - persist to db')
  }

  const onSkip = () => {
    console.log('skip - persist to db')
  }

  return (
    question && <QuestionAnswer question={question} onYes={onYes} onNo={onNo} onSkip={onSkip} />
  )
}
