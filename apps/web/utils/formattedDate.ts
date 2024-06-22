export const formattedDate = (date: string) => {
  const result = new Date(date);
  return `${result.getFullYear()}.${result.getMonth()}.${result.getDate()}`;
};

export function timeAgo(createdDate: string): string {
  const createdDateTime = new Date(createdDate);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - createdDateTime.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
}