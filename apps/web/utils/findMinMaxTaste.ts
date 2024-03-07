import { Taste } from '@/types/review';

export const findMinMaxTaste = (data: Taste): [string[], string[]] => {
  const keys = Object.keys(data) as Array<keyof Taste>;
  let minTasteValues: string[] = [];
  let maxTasteValues: string[] = [];
  let maxValue = -Infinity;
  let minValue = Infinity;

  keys.forEach(key => {
    const value = data[key];
    if (value > maxValue) {
      maxValue = value;
      maxTasteValues = [key];
    } else if (value === maxValue) {
      maxTasteValues.push(key);
    }

    if (value < minValue) {
      minValue = value;
      minTasteValues = [key];
    } else if (value === minValue) {
      minTasteValues.push(key);
    }
  });
  return [minTasteValues, maxTasteValues];
};
