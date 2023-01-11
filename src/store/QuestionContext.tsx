import { createContext, useContext, useReducer } from 'react';
import useTodayQuestionAns from '../hooks/useTodayQuestionAns';

export type Question = {
  id: string;
  title: string;
  schedule: QuestionSchedule;
  logs: LogEntry[];
};

export type QuestionSchedule = {
  days: number[];
  // we only pay attention to the time of day for the schedule
  time: Date;
};

export enum Answer {
  YES = 'yes',
  NO = 'no',
  SKIP = 'skip',
}

export type LogEntry = {
  questionId: string;
  timestamp: Date;
  answer: Answer;
};

export type CreatedOrEditedQuestionAction ={
  type: 'CREATED_OR_EDITED_QUESTION';
  payload: Question;
}

export type DeletedQuestionAction = {
  type: 'DELETED_QUESTION';
  payload: Question;
}

export type AnsweredQuestionAction = {
  type: 'ANSWERED_QUESTION';
  payload: LogEntry
}

function isNeverAction(action: never, reducer: string): never {
  throw new Error(`${reducer} received invalid action ${action}`)
}

type QuestionAction = CreatedOrEditedQuestionAction | DeletedQuestionAction | AnsweredQuestionAction;
type QuestionProviderProps = { children: React.ReactNode };
type QuestionDispatch = (action: QuestionAction) => void;
type QuestionState = Question[];


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

// hook to access a single question by id
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

function questionsReducer(state: QuestionState, action: QuestionAction): QuestionState {
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
    case 'ANSWERED_QUESTION':
      return state.map((question) => {
        if (question.id === action.payload.questionId) {
          const todayQuestionAns = useTodayQuestionAns(question);
          if (todayQuestionAns) {
            return {
              ...question,
              // replace last log entry with payload
              logs: question.logs.slice(0, -1).concat(action.payload)
            }
          }
          // no log entry for today, add new log entry
          return {
            ...question,
            logs: [
              ...question.logs,
              action.payload,
            ],
          };
        }
        return question;
      });
    case 'DELETED_QUESTION':
      return state.filter((question) => question.id !== action.payload.id);
    default:
      return isNeverAction(action, 'questionsReducer');
  }
}

const initialQuestions: QuestionState = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'work out today',
    schedule: {
      days: [0, 1, 2, 3, 4, 5, 6],
      time: new Date('2020-12-01T12:00:00.000Z'),
    },
    logs: [
      { questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', timestamp: new Date('2020-12-01T12:00:00.000Z'), answer: Answer.YES },
      { questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', timestamp: new Date('2020-12-02T13:00:00.000Z'), answer: Answer.NO },
    ]
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bv',
    title: 'create content today',
    schedule: {
      days: [0, 2, 4, 6],
      time: new Date('2020-12-01T12:00:00.000Z'),
    },
    logs: [
      { questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bv', timestamp: new Date('2020-12-01T12:00:00.000Z'), answer: Answer.YES },
      { questionId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bv', timestamp: new Date('2020-12-03T13:00:00.000Z'), answer: Answer.NO },
    ]
  },
];
