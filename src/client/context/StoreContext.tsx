import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { createStore, TStore } from '@client/store/RootStore';
import { RootStore } from '@client/store/RootStore'

export const storeContext = React.createContext<TStore | null>(null);

const root_store= new RootStore()

export const StoreProvider: React.FC = ({ children }) => {
//   const store = useLocalStore(createStore) as any; 
  return (
    <storeContext.Provider value={root_store}>
      {children}
    </storeContext.Provider>
  );
};

export const useStoreData = <Selection, ContextData, Store>(
	context: React.Context<ContextData>,
	storeSelector: (contextData: ContextData) => Store,
	dataSelector: (store: Store) => Selection
  ):Selection => {
	const value = React.useContext(context);
	if (!value) {
	  throw new Error();
	}
	const store = storeSelector(value);
	return useObserver(() => {
	  return dataSelector(store);
	});
  };

export const useRootData = <Selection extends unknown>(
	dataSelector: (store: TStore) => Selection
) =>
useStoreData(storeContext, contextData => contextData!, dataSelector); 

export default StoreProvider;
