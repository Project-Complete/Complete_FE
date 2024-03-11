import ky from 'ky';
const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const api = kyInstance.extend({
  hooks: {
    beforeRequest: [
      async request => {
        // 쿠키에서 access_token을 가져옴
        try {
          const accessToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('access_token='))
            ?.split('=')[1];
          if (!accessToken) throw 'accessToken undefined';

          // 요청에 access_token을 포함하여 전송
          request.headers.set('Authorization', `Bearer ${accessToken}`);
          return request;
        } catch (error) {
          throw error;
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 만료된 토큰 또는 인증 오류로 인한 요청 실패 시 토큰을 갱신하고 다시 요청을 시도합니다.
        if (response.status === 401) {
          console.log(
            '토큰 만료 또는 인증 오류. 토큰을 갱신하고 다시 요청합니다.',
          );
          try {
            const cookieRefreshToken = document.cookie
              .split('; ')
              .find(row => row.startsWith('refresh_token='))
              ?.split('=')[1];
            if (!cookieRefreshToken) throw 'refreshToken undefined';
            const newAccessToken = await refreshToken({
              request,
              cookieRefreshToken,
            });
            const cloneRequest = request.clone(); // 요청을 복제하여 수정

            // 갱신된 토큰으로 다시 요청을 보냅니다.
            cloneRequest.headers.set(
              'Authorization',
              `Bearer ${newAccessToken}`,
            );
            return ky(cloneRequest);
          } catch (error) {
            console.error('토큰 갱신 및 다시 요청 실패:', error);
            throw error; // 토큰 갱신 및 다시 요청에 실패하면 예외를 throw합니다.
          }
        }
        return response;
      },
    ],
  },
});

// 토큰 갱신 함수
const refreshToken = async ({
  request,
  cookieRefreshToken,
}: {
  request: Request;
  cookieRefreshToken: string;
}) => {
  try {
    // 토큰 갱신 요청을 보냅니다. (토큰 갱신 API의 주소와 요청 방식에 따라 수정해야 합니다.)
    request.headers.set(
      'Authorization-refresh',
      `Bearer ${cookieRefreshToken}`,
    );
    const response = await ky(request);
    const newAccessToken = response.headers.get('Authorization');
    const newRefreshToken = response.headers.get('Authorization-refresh');

    // 새로운 토큰을 쿠키에 저장합니다.
    document.cookie = `access_token=${newAccessToken}; Secure; HttpOnly; SameSite=Strict`;
    document.cookie = `refresh_token=${newRefreshToken}; Secure; HttpOnly; SameSite=Strict`;

    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    throw error; // 토큰 갱신에 실패하면 예외를 throw합니다.
  }
};

// // 로그아웃 함수
// const logout = () => {
//   localStorage.removeItem('token'); // 토큰 제거
//   // 다른 로그아웃 처리 로직 추가 가능
// };

// // 예시 로그인 함수
// const login = async (username, password) => {
//   try {
//     const response = await ky.post('https://api.example.com/login', {
//       json: { username, password }
//     }).json();

//     // 로그인 성공 시 토큰 저장
//     saveToken(response.token);

//     // 원하는 페이지로 리디렉션 등의 작업 수행
//   } catch (error) {
//     console.error('로그인 실패:', error);
//     // 로그인 실패 처리 로직 추가
//   }
// };
