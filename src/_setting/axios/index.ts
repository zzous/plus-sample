import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

/**
 * @process.env
 * VITE 에서는 import.meta.env 로 가져온다.
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 6000
});

/**
 * @cancel
 * server 단 취소는 안되고 , front 에서 취소
 */

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const myToken = localStorage.getItem('AUTH-TOKEN');
        const lastAccessTime = localStorage.getItem('lastAccessTime');

        if (config.headers) {
            config.headers['Content-Type'] = 'application/json';
            config.headers.Authorization = myToken ?? undefined;
        }

        return config;
    },
    (error: AxiosError) => {
        console.log('[API Request ERROR]', error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('[API Response]');

        const code = response.data?.code;
        const message = response.data?.message;

        if (
            code === 'ERROR_CODE_AI001' ||
            code === 'ERROR_CODE_AI002' ||
            code === 'ERROR_CODE_AI003' ||
            code === 'ERROR_CODE_AI004' ||
            code === 'ERROR_UNKNOWN_AUTHORIZATION'
        ) {
            if (window.location.pathname !== '/login') {
                alert(message || '인증 오류가 발생했습니다. 다시 로그인해주세요.');
            }
        } else {
            //응답 성공시 마지막 접속 시간을 갱신한다.
            localStorage.setItem('lastAccessTime', new Date().toISOString());
        }

        return response;
    },
    (error: AxiosError) => {
        console.log(error);
        // ~ axios에서 서버 요청을 취소한 경우에 실행.
        return Promise.reject(error);
    }
);

export const CancelToken = axios.CancelToken;

export default request;
