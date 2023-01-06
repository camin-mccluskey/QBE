import { createContext, useContext, useReducer } from 'react';

type QuestionProviderProps = { children: React.ReactNode };
type Action = { type: 'CREATED_QUESTION'; payload: Question } | { type: 'DELETED_QUESTION'; payload: Question };
type Dispatch = (action: Action) => void;
type State = Question[];

// todo - solidify type
type Question = {
  id: string;
  title: string;
  // todo - add type
  schedule: any;
};

const QuestionsContext = createContext<State | undefined>(undefined);
const QuestionsDispatchContext = createContext<Dispatch | undefined>(undefined);

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
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
}

// hook to access the questions dispatch
export function useQuestionsDispatch() {
  const context = useContext(QuestionsDispatchContext);
  if (context === undefined) {
    throw new Error('useQuestionsDispatch must be used within a QuestionProvider');
  }
  return context;
}

function questionsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'CREATED_QUESTION':
      return [...state, action.payload];
    case 'DELETED_QUESTION':
      return state.filter((question) => question.id !== action.payload.id);
    default:
      return state;
  }
}

const initialQuestions: Question[] = [];
