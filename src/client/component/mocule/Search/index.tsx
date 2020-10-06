import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { storeContext } from '@client/context/StoreContext';

const Search: React.FC = () => {
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shoulldn't be null");
  const { getQuery, setQuery } = store.query_store;
  return useObserver(() => {
    return <input value={getQuery()} onChange={e => setQuery(e.target.value)} />;
  });
}

export default Search;