import React from 'react';
import { observer } from 'mobx-react';
import { UI } from '@hooks/UI'
import loadCSs from './Sidebar.css'
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = observer(() => {
	const { area, button, label } = UI.useStyle(loadCSs)
	
	return (
		<>
			<aside css={area}>
				<div css={label}>
					<Link to='/'>홈</Link>
				</div>
				<div css={label}>
					<Link to='/page/lecture'>강의관리</Link>
				</div>
			</aside>
			<button css={button}></button>
		</>
  );
})


export default Sidebar;