import React from 'react';
import { Auto } from '@client/store/RootStore'
import { storeContext, useStoreData } from '@client/context/StoreContext';

export const AutoView: React.FC<{ auto: Auto }> = ({ auto }) => {
  return (
    <li>
      {auto.getName()}
    </li>
  );
}

export const AutoList = () => {
  	const auto_store = useStoreData(storeContext, x=>x!.auto_store, x=>x);
	const query_store = useStoreData(storeContext, x=>x!.query_store, x=>x);
	
	return (
		<>
			<ul>	
				{auto_store.auto_list.map((val,index)=><div key={index}>{val.name}</div> )}
			</ul>
			<button onClick={auto_store.addNewAuto}>추갓{auto_store.trigger}</button>
		</>
	)
}

export default AutoList;