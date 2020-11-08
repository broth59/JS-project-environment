import React from 'react';
import { observer } from 'mobx-react';
import { UI } from '@hooks/UI'
import loadCSs from './Main.css'

export const Main: React.FC = observer(() => {
	const { area } = UI.useStyle(loadCSs)
	
	return (
		<main css={area}>
				
		</main>
  );
})


export default Main;