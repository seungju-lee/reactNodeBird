import { useCallback, useState } from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const inputHandle = useCallback(e => {
    setValue(e.target.value);
  }, []);
  return [value, inputHandle, setValue];
};

export default useInput;
