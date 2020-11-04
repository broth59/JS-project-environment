import React from 'react';
import { storeContext, useStoreData } from '@client/context/StoreContext';

export const CityView: React.FC<{ cities: string[] }> = ({ cities }) => {
  return (
    <ul>
      {cities.map((city, index) => <li key={index}>{city}</li>)}
    </ul>
  );
}

export const CityList = () => {
  const store = useStoreData(storeContext, x=>x!.query_store, x=>x.filteredCities);
  if (!store) throw Error("Store shouldn't be null");
  return <CityView cities={store} />;
}

export default CityList;