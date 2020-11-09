import React from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './ContentTitle.css'

export const ContentTitle: React.FC<{ title: string }> = ({ title }) => {
	const { content_title } = UI.useStyle(loadCSs)
	
	return (
		<strong css={content_title}>
			${title}
		</strong>
  );
}


export default ContentTitle;