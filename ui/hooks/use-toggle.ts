import { useState, type Dispatch, type SetStateAction } from 'react';

export const useToggle = <const T extends string[]>(
  options: T,
  initial: T[number],
): [T[number], T, Dispatch<SetStateAction<T[number]>>] => {
  const [value, setValue] = useState(initial);

  return [value, options, setValue];
};
