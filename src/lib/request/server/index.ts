import axios from 'axios';
import { getBaseUrl } from '../../utils/env';
import { IExtensionContext } from '../../interface';
import AsyncLocalStore from '../../utils/asyncLocalStorage';

const request = axios.create({
  baseURL: getBaseUrl() // 请参看src/env.config各个环境配置
});

const requestSuccess = (config: any) => {
  const extensionContext = AsyncLocalStore.get<IExtensionContext>('extensionContext');
  if (extensionContext.headers.authorization !== undefined) {
    config.headers['Authorization'] = extensionContext.headers.authorization;
  }
  if (extensionContext.headers.cookie !== undefined) {
    config.headers['Cookie'] = extensionContext.headers.cookie;
  }
  return config;
};

const requestError = async (error: any) => {
  return await Promise.reject(error);
};

const responseSuccess = async (response: any) => {
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
  requestError
);

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
