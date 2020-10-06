import React from 'react';
import StoreProvider from '@client/context/StoreContext'
import CityList from '@component/mocule/City';
import Search from '@component/mocule/Search'
import { hot } from 'react-hot-loader/root'
import { AutoList } from './component/mocule/AutoList';

const App: React.FC = () => {
  return (
	<StoreProvider>
		<div className="App">
			<header className="App-header">
				<Search/>
				<CityList/>
				<AutoList/>
				<div>Not render</div>
			</header>
		</div>
	</StoreProvider>
  );
}


export default hot(App)