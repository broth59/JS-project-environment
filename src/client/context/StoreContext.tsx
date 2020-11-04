import React, { ComponentType } from 'react';
import { useLocalStore, useObserver, observer } from 'mobx-react';
import { createStore, TStore } from '@client/store/RootStore';
import { RootStore } from '@client/store/RootStore'
import hoistNonReactStatics from 'hoist-non-react-statics';

export const storeContext = React.createContext<TStore | null>(null);


export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore) as any 
  return (
    <storeContext.Provider value={store.value_}>
      {children}
    </storeContext.Provider>
  )
}

export const useStoreData = <Selection, ContextData, Store>(
	context			: React.Context<ContextData>,
	storeSelector	: (contextData: ContextData) => Store,
	dataSelector	: (store: Store) => Selection
):Selection => {
	const value = React.useContext(context)
	if (!value) {
	  throw new Error()
	}
	const store = storeSelector(value);
	return useObserver(() => {
	  return dataSelector(store);
	})
  }

export const useRootData = <Selection extends unknown>(
	dataSelector: (store: TStore) => Selection
) => useStoreData(storeContext, contextData => contextData!, dataSelector); 


export function inject<SubStore extends any>(selector:(root_store:RootStore)=>SubStore){
	return (WrappedComponent:ComponentType<PartialMethods<SubStore>>)=>{
		WrappedComponent = observer(WrappedComponent)
		
		return (props:PartialMethods<SubStore>)=>{
			
			const ComponentWithStore = observer(()=>{
				const store = useRootData(selector) as any
				const prototypes = Object.getPrototypeOf(store)
				const prototypes_keys = Object.getOwnPropertyNames(prototypes)
				const methods = prototypes_keys.reduce((acc, key)=>{
					const method = prototypes[key]
					if(typeof method === 'function') acc[key] = method.bind(store)	
					return acc
				}, {} as any)

				return <WrappedComponent {...props} {...methods } />
			})
			
			hoistNonReactStatics(ComponentWithStore, WrappedComponent)

			return <ComponentWithStore />
		}
	}
}

  

export type StoreProps<T> = { store?: T }


export default StoreProvider
