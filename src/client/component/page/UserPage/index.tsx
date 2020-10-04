import React, { useCallback } from 'react'
import { observer, useObserver } from 'mobx-react'
import { jsx } from '@emotion/core'
import RootStore from '@client/store/RootStore'
import { withStore, useStore } from '@client/context/StoreContext'
import { autobind } from 'core-decorators'
import NoteStore from '@client/store/NoteStore'

 
@autobind
class UserPage extends React.Component<{ store?:NoteStore }, any>{

	addNewNote(){
		const note_store = this.props.store!
		note_store!.addNote('note', 'comment')
		console.log(note_store)
	}

	render(){
		const note_store = this.props.store!
		
       	return (
			<>
			<div onClick={this.addNewNote}>추가</div>
				{note_store!.note_list.map(note=>
					(<div key={note.id}>{note.content} / {note.comment}</div>))}
	   		</>
		)
    }
}

const User = observer(()=>{
	const { note_store } = useStore()!
	const addNewNote = useCallback(()=>{
		note_store!.addNote('note', 'comment')
	}, [])
	console.log(note_store)
	return (
		<>
			<div onClick={addNewNote}>추가</div>
			{note_store!.note_list.map(note=>
				(<div key={note.id}>{note.content} / {note.comment}</div>))}
		</>
	) 
})

export default observer(UserPage)