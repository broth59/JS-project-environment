// import React, { useCallback } 			from 'react'
// import { observer, useObserver } 	from 'mobx-react'
// import { withStore, useStore } 	from '@client/context/StoreContext'
// import { autobind }	 	from 'core-decorators'

// import RootStore from '@client/store/RootStore'
// import NoteStore from '@client/store/NoteStore'
 
 

// const UserPage = ({ store }:{store: NoteStore})=>{

// 	const addNewNote = useCallback(()=>{
// 		store.addNote('note', 'comment')
// 	}, [] )

// 	return (
// 		<>
// 			<div onClick={addNewNote}>추가</div>
// 				{store!.note_list.map(note=>
// 					(<div key={note.id}>{note.content} / {note.comment}</div>))}
// 		   </>
// 	)
// }

// const User = ()=>{
// 	const root_store = useStore()!
// 	const addNewNote = useCallback(()=>{
// 		root_store!.note_store!.addNote('note', 'comment')
// 	},[])	

// 	return useObserver(()=>(
// 		<>
// 			<UserPage store={root_store.note_store!}/>
// 		</>
// 	))
// }

// export default User

