import { createContext, useReducer } from 'react';
import { voteReducer, initialState } from '../reducers/voteReducer';

export const VoteContext = createContext();

export function VoteProvider({ children }) {
  const [state, dispatch] = useReducer(voteReducer, initialState);

  return (
    <VoteContext.Provider value={{ state, dispatch }}>
      {children}
    </VoteContext.Provider>
  );
}

