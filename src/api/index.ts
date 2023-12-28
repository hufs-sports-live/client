import axios, { AxiosError } from 'axios';

import LocalStorage from '@/utils/LocalStorage';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const adminInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_OFFICE_BASE_URL,
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => {
  const tokenInLocalStorage = LocalStorage.getItem('token');

  if (tokenInLocalStorage) return tokenInLocalStorage;
  else return null;
};

const onError = async (message: string) => {
  alert(message);
  return;
};

adminInstance.interceptors.request.use(config => {
  const existedToken = getAccessToken();
  config.headers.Authorization = `Bearer ${existedToken}`;

  return config;
});

let retryCounter = 0;

adminInstance.interceptors.response.use(
  res => {
    retryCounter = 0;
    return res;
  },
  async (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      alert('서버에 문제가 발생했습니다.');
    }

    switch (error.response?.status) {
      case 400: {
        onError('400: 잘못된 요청입니다.');
        break;
      }
      case 401: {
        if (retryCounter < 3) {
          retryCounter++;
          try {
            const existedToken = getAccessToken();
            if (!existedToken) throw new Error('no accessible token');
            return await adminInstance({
              ...error.config,
              headers: { Authorization: `Bearer ${existedToken}` },
            });
          } catch (e) {
            const message =
              e instanceof Error ? e.message : '401: 로그인이 필요합니다.';
            onError(message);
            return (window.location.href = '/login');
          }
        } else {
          onError('재시도 횟수를 초과하였습니다. 로그인 페이지로 이동합니다.');
          return (window.location.href = '/login');
        }
      }
      case 403: {
        onError('403: 권한이 필요합니다.');
        break;
      }
      case 404: {
        onError('404: 잘못된 요청입니다.');
        break;
      }
      case 500: {
        onError('500: 서버에 문제가 발생했습니다.');
        break;
      }
      default: {
        onError('알 수 없는 오류입니다.');
        break;
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
