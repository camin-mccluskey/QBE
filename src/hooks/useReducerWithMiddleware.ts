import { useEffect, useReducer, useRef } from 'react'

export interface GenericAction { type: string, payload?: unknown };

export default function useReducerWithMiddleware<State, Action extends GenericAction>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  middlewareFns: ((action: Action, state: State) => void)[],
  afterwareFns: ((action: Action, state: State) => void)[],
): [State, (action: Action) => void] {

  const [state, dispatch] = useReducer(reducer, initialState)

  const actionRef = useRef<Action>()

  const dispatchWithMiddleware = (action: Action) => {
    middlewareFns.forEach((fn) => fn(action, state))
    actionRef.current = action
    dispatch(action)
  }

  useEffect(() => {
    if (actionRef.current !== undefined) {
      afterwareFns.forEach((fn) => fn(actionRef.current as Action, state))
      actionRef.current = undefined
    }
  }, [afterwareFns, state])

  return [state, dispatchWithMiddleware]
}
