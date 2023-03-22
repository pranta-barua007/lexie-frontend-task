import React, { createContext, useReducer, FC, ReactNode } from 'react';

import { INasaAsset, INasaSearchResult } from '@utils/api/api.types';

type StoreState = {
  currentCollection: ICurrentCollection | null;
  collections: INasaSearchResult[];
};

type StoreAction = { type: string; payload: any };

export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}>({
  state: { currentCollection: null, collections: [] },
  dispatch: () => null,
});

export const ACTION_TYPES = {
  SET_COLLECTIONS: 'SET_COLLECTIONS',
  SET_CURRENT_COLLECTION: 'SET_CURRENT_COLLECTION',
};

interface ICurrentCollection extends INasaSearchResult, INasaAsset {}

const storeReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COLLECTIONS: {
      return { ...state, collections: action.payload };
    }
    case ACTION_TYPES.SET_CURRENT_COLLECTION: {
      return { ...state, currentCollection: action.payload };
    }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

type StoreProps = {
  children: ReactNode;
};

const StoreProvider: FC<StoreProps> = ({ children }) => {
  const initialState: StoreState = { currentCollection: null, collections: [] };
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
