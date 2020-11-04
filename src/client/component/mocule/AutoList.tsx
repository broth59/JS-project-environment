import React from 'react';
import { Auto, RootStore, AutoStore } from '@client/store/RootStore'
import { inject, StoreProps } from '@client/context/StoreContext';
import { observer } from 'mobx-react';

export const AutoView: React.FC<{ auto: Auto }> = observer(({ auto }) => {
  return (
    <li onClick={auto.setName}>
      {auto.getName()}
    </li>
  )
})


export class AutoList extends React.Component<PartialMethods<AutoStore>, any>{
	
	state = {
		hi : 0
	}


	render(){
		const { getAutoList, addNewAuto } = this.props

		return (
			<>
				<ul>	
					{getAutoList!().map((auto,index)=><AutoView auto={auto} key={index} /> )}
				</ul>
				<button onClick={()=>{addNewAuto!();}}>추갓</button>
			</>
		)
	}
}

export default  inject(x=>x.auto_store)(AutoList);