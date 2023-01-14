import { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTodayQuestionAns from '../hooks/useTodayQuestionAns';
import reviveDate from '../utils/reviveDate';

export type Question = {
  id: string;
  title: string;
  schedule: QuestionSchedule;
  logs: LogEntry[];
};

export type QuestionSchedule = {
  // 0 is Sunday, 6 is Saturday
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

export type HydrateQuestionsAction = {
  type: 'HYDRATE_QUESTIONS';
  payload: Question[];
}

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

type QuestionAction = HydrateQuestionsAction
                      | CreatedOrEditedQuestionAction
                      | DeletedQuestionAction
                      | AnsweredQuestionAction;
type QuestionProviderProps = { children: React.ReactNode };
type QuestionDispatch = (action: QuestionAction) => void;
type QuestionState = Question[];


const QuestionsContext = createContext<QuestionState | undefined>(undefined);
const QuestionsDispatchContext = createContext<QuestionDispatch | undefined>(undefined);

export function QuestionContextProvider({ children }: QuestionProviderProps) {
  const [questions, dispatch] = useReducer(questionsReducer, initialQuestions);

  const maybeEmitSkipLog = (question: Question) => {
    // should have a log entry for every day in the schedule
    // is this expensive to go back through all the logs? We actually only need to go from the date of the last log entry
    // to the current date
    const today = new Date();
    const lastLogDate = question.logs.at(-1)?.timestamp;
    // if (lastLogDate && lastLogDate) {}
  }

  const hydrateQuestions = async () => {
    try {
      const state = await AsyncStorage.getItem('@qbe:questions');
      if (state !== null) {
        dispatch({type: 'HYDRATE_QUESTIONS', payload: JSON.parse(state, reviveDate)});
        // should any questions be "answered" as skipped?
        questions.forEach(question => maybeEmitSkipLog(question));
      } else {
        console.log('No questions found in storage');
      }
    } catch (e) {
      console.warn('Error fetching questions from storage', e);
    }
  }

  useEffect(() => {
    // fetch questions from storage
    hydrateQuestions();
  }, [])

  useEffect(() => {
    // save questions to storage
    const saveQuestions = async () => {
      try {
        await AsyncStorage.setItem('@qbe:questions', JSON.stringify(questions));
      } catch (e) {
        console.warn('Error saving questions to storage', e);
      }
    }
    saveQuestions();
  }, [questions])

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
    case 'HYDRATE_QUESTIONS':
      return action.payload;
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

const initialQuestions: QuestionState = [];
