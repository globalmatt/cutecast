import {useEffect} from 'react';

// https://stackoverflow.com/a/56767883/10310114
// https://github.com/facebook/create-react-app/issues/6880#issuecomment-486636121

export default function useMount(fun) {
  useEffect(fun, []);
}
