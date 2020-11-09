import React from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './Content.css'

export const Content: React.FC<{ title: string }> = ({ title }) => {
	const { content } = UI.useStyle(loadCSs)
	
	return (
		<dd css={content}>
			${title}
		</dd>
  );
}


export default Content;