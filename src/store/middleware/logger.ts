import { GenericAction } from '../../hooks/useReducerWithMiddleware'

export default function logger<State, Action extends GenericAction>(action: Action, state: State) {
  console.log('ACTION', action)
  console.log('STATE', state)
}
