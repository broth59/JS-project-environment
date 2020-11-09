import React, { useEffect, useState, useRef } from 'react';
import { UI } from '@hooks/UI'
import loadCSs from './LecturePage.css'
import { inject } from '@client/context/StoreContext'
import Card from '@component/mocule/Card'


export const LecturePage: React.FC = inject(x=>x.lecture_store)(({ store }) => {
	const { lecture_page, lecture_header, card_list } = UI.useStyle(loadCSs)

	const skip = useRef(0)
	const take = useRef(30)
	const last_card = useRef<HTMLDivElement>(null)
	const root_element = useRef<HTMLDivElement>(null) 
	const intersection_observer = useRef(new IntersectionObserver((entries, observer) => {
		console.log(entries)
		// entries.forEach(async entry => {
		// 	observer.unobserve(entry.target)
		// 	skip.current ++ 
		// 	take.current ++
		// 	console.log(entry.target, last_card.current)
		// 	console.log(entry.target, last_card.current)
		// 	await store.loadList!(skip.current, take.current)
		// 	if(entry.target != last_card.current){
		// 		observer.observe(last_card.current!)
		// 	}

		// throw Error()
			
		// })
	}, { root: root_element.current }))
	
	if(last_card.current){
		intersection_observer.current.observe(last_card.current)
	}


	useEffect(()=>{
		store.loadList!(skip.current, take.current)
	}, [])

	const lectures = store.getList!()

	return (
		<section css={lecture_page} ref={root_element}>
			<header css={lecture_header}></header>
			<div css={card_list}>
				{lectures.map((lecture, index)=>{
					const last_index = lectures.length - 1
					const { content_no } = lecture.getEntity()
					return (
						<React.Fragment key={content_no}>		
							<Card lecture={lecture} />
							{index == last_index ? <div ref={last_card}></div> : null}
						</React.Fragment>
					)
				})}	
			</div>
		</section>
  );
})


export default LecturePage;