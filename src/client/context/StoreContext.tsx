import React, { FC, createContext, ReactNode, ReactElement, useContext, ComponentType } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useLocalStore, useObserver } 	from 'mobx-react'
import RootStore from '@client/store/RootStore'

export const StoreContext = createContext<RootStore>({} as RootStore);

export type StoreComponent = FC<{
  children	: ReactNode;
}>;


export const StoreProvider = StoreContext.Provider

export function useStore():RootStore {
	return useContext(StoreContext)
}

export type TWithStoreHOC = <P extends unknown>(
    Component: ComponentType<P>,
) => (props: P) => JSX.Element;


export const withStore: TWithStoreHOC = (WrappedComponent) => (props) => {
    const ComponentWithStore = () => {
        const store = useStore();
		
        return <WrappedComponent {...props} store={store} />;
    };

    ComponentWithStore.defaultProps = { ...WrappedComponent.defaultProps };
    ComponentWithStore.displayName = `WithStores(${
        WrappedComponent.name || WrappedComponent.displayName
    })`;

    hoistNonReactStatics(ComponentWithStore, WrappedComponent);

    return <ComponentWithStore/>;
}