import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  console.log(clsx(inputs));
  return clsx(inputs);
}
