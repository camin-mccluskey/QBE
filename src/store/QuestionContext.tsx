import { createContext, useContext, useReducer } from 'react';

type QuestionProviderProps = { children: React.ReactNode };
type QuestionAction = { type: 'CREATED_OR_EDITED_QUESTION'; payload: Question } | { type: 'DELETED_QUESTION'; payload: Question };
type QuestionDispatch = (action: QuestionAction) => void;
type QuestionState = Question[];

export type Question = {
  id: string;
  title: string;
  schedule: QuestionSchedule;
};

export type QuestionSchedule = {
  days: number[];
  time: Date;
}

const QuestionsContext = createContext<QuestionState | undefined>(undefined);
const QuestionsDispatchContext = createContext<QuestionDispatch | undefined>(undefined);

export function QuestionContextProvider({ children }: QuestionProviderProps) {
  const [questions, dispatch] = useReducer(questionsReducer, initialQuestions);

  return (
    <QuestionsContext.Provider value={questions}>
      <QuestionsDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionsDispatchContext.Provider>
    </QuestionsContext.Provider>
  );
}

// hook to access the questions state
export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionContextProvider');
  }
  return context;
}

export function useQuestion(id: string) {
  const questions = useQuestions();
  return questions.find((question) => question.id === id);
}

// hook to access the questions dispatch
export function useQuestionsDispatch() {
  const context = useContext(QuestionsDispatchContext);
  if (context === undefined) {
    throw new Error('useQuestionsDispatch must be used within a QuestionContextProvider');
  }
  return context;
}

function questionsReducer(state: QuestionState, action: QuestionAction) {
  switch (action.type) {
    case 'CREATED_OR_EDITED_QUESTION': {
      const questionExists = state.some((question) => question.id === action.payload.id);
      if (questionExists) {
        return state.map((question) => {
          if (question.id === action.payload.id) {
            return action.payload;
          }
          return question;
        });
      }
      return [...state, action.payload];
    }
    case 'DELETED_QUESTION':
      return state.filter((question) => question.id !== action.payload.id);
    default:
      return state;
  }
}

const initialQuestions: QuestionState = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Will you work out today?',
    schedule: {
      days: [0, 1, 2, 3, 4, 5, 6],
      time: new Date('2020-12-01T12:00:00.000Z'),
    }
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bv',
    title: 'Will you create content today?',
    schedule: {
      days: [0, 2, 4, 6],
      time: new Date('2020-12-01T12:00:00.000Z'),
    }
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bdfa',
    title: 'Will you create music today?',
    schedule: {
      days: [0, 2, 4, 6],
      time: new Date('2020-12-01T12:00:00.000Z'),
    }
  },
];
