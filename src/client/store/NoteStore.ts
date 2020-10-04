import { observable, action } from 'mobx'
import { autobind } from 'core-decorators'
import RootStore from './RootStore'

interface Note {
	id:number
	content :string
	comment?:string
}


export default class NoteStore {
	static serial = 0
	
	@observable
	note_list:Array<Note> = [
		{ id: NoteStore.serial ++, content: '아',  	comment: '뭐' },
		{ id: NoteStore.serial ++, content: '던파',  comment: '프레이야' }
	]

	
	constructor(
		public root_store: RootStore
	){
		this.root_store = root_store
	}


	@action
	addNote(content:string, comment:string):void{
		this.note_list.push({
			id: NoteStore.serial ++,
			content, comment 
		})
	} 

	@action  
	removeNote(removable_note:Note):void{
		const note_index = this.note_list.findIndex(note=>note.id==removable_note.id)
		this.note_list.splice(note_index, 1)
	}
}