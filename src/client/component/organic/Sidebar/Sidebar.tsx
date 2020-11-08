import React from 'react';
import { observer } from 'mobx-react';
import { UI } from '@hooks/UI'
import loadCSs from './Sidebar.css'

export const Sidebar: React.FC = observer(() => {
	const { area, button } = UI.useStyle(loadCSs)
	
	return (
		<>
			<aside css={area}>
					
			</aside>
			<button css={button}></button>
		</>
  );
})


export default Sidebar;