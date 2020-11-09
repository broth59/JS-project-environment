import React from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './Content.css'

export const Content: React.FC<{ contents?: string }> = ({ contents }) => {
	const { content } = UI.useStyle(loadCSs)
	
	return (
		<dd css={content}>
			${contents}
		</dd>
  );
}


export default Content;