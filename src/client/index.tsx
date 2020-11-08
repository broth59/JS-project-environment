import { ENVKEY } from '@client/bootstrap'

import React from 'react'
import ReactDom from 'react-dom'
import App from '@client/App'
window.React = React

 
ReactDom.render(
	<App/>,  
	document.getElementById('root')
)

console.clear()
