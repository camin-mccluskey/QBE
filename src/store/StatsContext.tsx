import { createContext, useContext, useReducer } from 'react';

type StatsContextProviderProps = { children: React.ReactNode };
type Action = { type: 'ANSWERED_QUESTION'; payload: StatLog };
type Dispatch = (action: Action) => void;
type State = StatLog[];

// todo - solidify type
type StatLog = {
  id: string;
  questionId: string;
  saidYes: boolean;
};

const StatsContext = createContext<State | undefined>(undefined);
const StatsDispatchContext = createContext<Dispatch | undefined>(undefined);

export function StatsContextProvider({ children }: StatsContextProviderProps) {
  const [stats, dispatch] = useReducer(statsReducer, initialStats);

  return (
    <StatsContext.Provider value={stats}>
      <StatsDispatchContext.Provider value={dispatch}>
        {children}
      </StatsDispatchContext.Provider>
    </StatsContext.Provider>
  );
}

// hook to access the questions state
export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsContextProvider');
  }
  return context;
}

// hook to access the questions dispatch
export function useStatsDispatch() {
  const context = useContext(StatsDispatchContext);
  if (context === undefined) {
    throw new Error('useStatsDispatch must be used within a StatsContextProvider');
  }
  return context;
}

function statsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ANSWERED_QUESTION':
      return [...state, action.payload];
    default:
      return state;
  }
}

const initialStats: State = [];
