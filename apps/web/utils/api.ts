import ky from 'ky';
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});
