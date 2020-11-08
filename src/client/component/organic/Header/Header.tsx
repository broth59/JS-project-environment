import React from 'react';
import { observer } from 'mobx-react';
import { UI } from '@hooks/UI'
import loadCSs from './Header.css'

export const Header: React.FC = observer(() => {
	const { area } = UI.useStyle(loadCSs)
	
	return (
		<header css={area}>
			
		</header>
  );
})


export default Header;