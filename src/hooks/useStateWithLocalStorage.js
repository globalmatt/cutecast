import {useState, useEffect} from 'react';

function useStateWithLocalStorage(keyName, defaultValue) {

  const [value, setValue] = useState(
      localStorage.getItem(keyName) ?
      JSON.parse(localStorage.getItem(keyName)) :
      defaultValue
    );
  
  useEffect( () =>
    localStorage.setItem(keyName, JSON.stringify(value))
    , [keyName, value]
  );

  return [value, setValue];
}

export default useStateWithLocalStorage;
