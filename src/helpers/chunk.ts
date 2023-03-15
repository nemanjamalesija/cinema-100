import { singleMovie } from '../constants/types';

export const chunk = (array: singleMovie[], size: number) => {
  if (size < 1) throw new Error('Size must be positive');

  const result = [];
  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size));

  return result;
};
