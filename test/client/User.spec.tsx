import React 	  from 'react'
import { render } from '@testing-library/react' 
import UserPage from '@page/UserPage'

describe('<UserPage/>', ()=>{
	it('', ()=>{
		const utils = render(<UserPage/>)
		expect(utils.container).toMatchSnapshot()
	})
})