import React, { useMemo } from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './DateText.css'
import { format as dateFormat } from 'ts-date'

export const DateText: React.FC<{ date: Date, format?:string }> = ({ date, format }) => {
	const { date_text } = UI.useStyle(loadCSs)
	
	const date_format = format || 'yyyyMMdd'
	const date_string = useMemo(()=>dateFormat(date,date_format), [date])
	return (
		<time css={date_text}>
			${date_string}
		</time>
  );
}
 

export default DateText;