import React, { useMemo, RefObject } from 'react';
import { parse } from 'ts-date'

import { UI } from '@hooks/UI'
import loadCSs from './Card.css'
import { Lecture } from '@interface/domain/Lecture';
import LectureEntity from '@interface/entity/LectureEntity';
import ContentTitle from '@client/component/atom/ContentTitle/ContentTitle';
import Content from '@client/component/atom/Content/Content';
import DateText from '@client/component/atom/DateText/DateText';

export const Card: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
	const { card } = UI.useStyle(loadCSs)
	const { content_no, content_title, content_outline, title_image_path, content_regist_date }:LectureEntity = lecture.getEntity()
	
	const date = useMemo(()=>new Date(content_regist_date!), [content_regist_date])
	
	return (
		<article css={card} >
			<ContentTitle title={content_title!} />
			<Content contents={content_outline!} />
			<DateText  date={date} />
		</article>
  );
}


export default Card;