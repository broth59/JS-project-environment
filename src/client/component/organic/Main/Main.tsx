import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react';
import { UI } from '@hooks/UI'
import loadCSs from './Main.css'
import LecturePage from '@client/component/page/LecturePage';

export const Main: React.FC = observer(withRouter(({ history }) => {
	const { area } = UI.useStyle(loadCSs)
	
	return (
		<main css={area}>
			<Route path='/page/lecture' component={LecturePage} />
		</main>
  );
})) as any


export default Main;