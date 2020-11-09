///<reference types="ordinary-type-bundle" />
import React from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter } from 'react-router-dom'
import '@client/bootstrap'
import StoreProvider from '@client/context/StoreContext'
import { UI } from '@hooks/UI'
//components 
import Header from '@component/organic/Header'
import Sidebar from '@component/organic/Sidebar';
import Main from '@component/organic/Main';
//css
import loadCss from './App.css'

const App: React.FC = () => {
	const { app } = loadCss({} as any)

	return (
		<StoreProvider>
			<BrowserRouter>
				<div className="App" css={app}>
					<Header/>
					<Sidebar/>
					<Main/>
				</div>
			</BrowserRouter>
		</StoreProvider>
	);
}


export default hot(App)