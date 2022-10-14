import axios from 'axios';

let baseUrl;
// 开发环境通过统一的前缀在config.js配置proxy代理转发请求
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '';
}

const request = axios.create({
  baseURL: baseUrl
});

const requestSuccess = (config: any) => {
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  return config;
};
const requestError = async (error: any) => {
  return await Promise.reject(error);
};
const responseSuccess = async (response: any) => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return await Promise.resolve(response.data);
  } else {
    return await Promise.reject(response);
  }
};

const responseError = async (error: any) => {
  return await Promise.reject(error);
};

request.interceptors.request.use(
  requestSuccess,
  requestError);

// 响应拦截器
request.interceptors.response.use(
  responseSuccess,
  responseError
);

const get = async (url: string, params: any = {}): Promise<any> => {
  return await request.get(url, {
    params: {
      ...params
    }
  });
};

const post = async (url: string, data: any = {}): Promise<any> => {
  return await request.post(url, data);
};

const put = async (url: string, data: any = {}): Promise<any> => {
  return await request.put(url, data);
};

const del = async (url: string): Promise<any> => {
  return await request.delete(url);
};

const options = async (url: string): Promise<any> => {
  return await request.options(url);
};

export {
  get,
  post,
  put,
  del,
  options
};
