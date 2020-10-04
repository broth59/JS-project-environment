import React from 'react'
import UserPage 	from '@page/UserPage'
import { StoreProvider } from '@client/context/StoreContext'
import RootStore from '@client/store/RootStore'
import NoteStore from '@client/store/NoteStore'

const root_store = new NoteStore({})

export default class App extends React.Component{
    render(){
       return (
		//<StoreProvider value={root_store}>
			<UserPage store={root_store}/>
		//</StoreProvider>
	   )
    }
}