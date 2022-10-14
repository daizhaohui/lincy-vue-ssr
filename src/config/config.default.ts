import { join } from 'path';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// import * as redisStore from 'cache-manager-ioredis';
export type DefaultConfig = PowerPartial<EggAppConfig>;

// const redisCache = {
//   store: redisStore,
//   options: {
//     host: 'localhost', // default value
//     port: 6379, // default value
//     password: '',
//     db: 0,
//     keyPrefix: 'cache:',
//     ttl: 3600
//   }
// };

const memoryCache = {
  store: 'memory',
  options: {
    max: 100,
    ttl: 10 // 修改默认的ttl配置
  }
};

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_18110384467231_8888_';
  // add your config here
  config.middleware = ['extensionContextMiddleware', 'redirectMiddleware', 'globalServiceMiddleware', 'cacheMiddleware'];
  config.static = {
    prefix: '/',
    dir: [join(appInfo.appDir, './build'), join(appInfo.appDir, './public')]
  };
  // 缓存设置
  config.cache = memoryCache; // redisCache;
  return config;
};
