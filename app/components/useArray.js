import React, { useState, useEffect, useCallback } from 'react';

const useArray = (initial = []) => {
  const [value, setValue] = useState(initial);

  return {
    value,
    setValue,
    add: value => {
      setValue(array => [...array, value]);
    },
    remove: index => {
      setValue(array => array.filter((item, i) => i != index));
    },
  };
};

export default useArray;
