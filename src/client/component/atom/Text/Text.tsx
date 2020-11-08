import React from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './Text.css'

export const Label: React.FC<{ text: string }> = ({ text }) => {
	const { label } = UI.useStyle(loadCSs)
	
	return (
		<label css={label}>
			${text}
		</label>
  );
}


export default Label;