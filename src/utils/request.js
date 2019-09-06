import axios from 'axios';

export default function request(options = {}) {
    axios.interceptors.request.use(
        request => {
            // app.setLoading(true);
            // const token = storage.get('boss_token');
            // const tokenIsExpired = storage.isExpired('boss_token');
            // const pathname = window.location.pathname;
            // if (tokenIsExpired && pathname !== prefix && pathname !== `${prefix}/home`) {
                // jumpRoute('Auth', '', true);
                // let cancel = null;
                // request.cancelToken = new axios.CancelToken(c => {cancel = c});
                // cancel();
            // } else {
            //     request.headers.token = token;
            // }
            return request;
        },
        err => {
            return Promise.reject(err);
        }
    )

    axios.interceptors.response.use(
        response => {
            // setTimeout(() => {
            //     app.setLoading(false);
            // }, 500);
            // const { code } = response.data;
            // let tokenIsExpired = code === '20002' || code === '20003';
            // const pathname = window.location.pathname;
            // if (tokenIsExpired && pathname !== prefix && pathname !== `${prefix}/home`) {
            //     jumpRoute('Auth', '', true);
            // }
            return response;
        },
        err => {
            return Promise.reject(err);
        }
    )
    return axios(options)
        .then(res => {
            const { data } = res;
            return Promise.resolve(data);
        })
        .catch(err => {
            // setTimeout(() => {
            //     app.setLoading(false);
            // }, 500);
            // if (err.response && /^5/.test(err.response.status.toString())) {
            //     Toast.info('服务器异常');
            // }
            return Promise.reject(err);
        })
}