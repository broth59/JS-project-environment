import React from 'react'
import NoteStore from './NoteStore'

export default class RootStore {
	
	constructor(
		public note_store?: NoteStore,
	){
		this.note_store = note_store || new NoteStore(this)
	}
}