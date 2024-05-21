export const formattedDate = (date: string) => {
  const result = new Date(date);
  return `${result.getFullYear()}.${result.getMonth()}.${result.getDate()}`;
};
