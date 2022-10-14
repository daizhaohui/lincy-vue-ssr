import { IAppConfig, ICachePageConfig, IPageCacheService } from '~/lib/interface';
import { CacheManager } from '@midwayjs/cache';
import AppConfig from '~/app.config';
import { parse } from 'regexparam';
import { RouterPathPrefix } from '../utils/render';

export class PageCacheService implements IPageCacheService {
  cache: CacheManager;
  constructor (cacheManager: CacheManager) {
    this.cache = cacheManager;
  }

  async set<T>(key: string, value: T, ttl?: number) {
    await this.cache.set<T>(key, value, { ttl: ttl || 3600 });
  }

  async get<T> (key: string): Promise<T> {
    return await this.cache.get<T>(key);
  }

  async del (key: string) {
    await this.cache.del(key);
  }

  isCached (key: string): boolean {
    const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
    let i;
    let len;
    let path;
    if (appConfig?.cache?.enabled && appConfig?.cache?.pages && appConfig?.cache?.pages.length) {
      len = appConfig?.cache?.pages.length;
      for (i = 0; i < len; i++) {
        path = `${RouterPathPrefix}${appConfig?.cache?.pages[i].path}`;
        if (parse(path).pattern.test(key)) {
          return true;
        }
      }
    }
    return false;
  }

  getConfig (key: string): ICachePageConfig | null {
    const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
    let i;
    const len = appConfig?.cache?.pages.length;
    let config: ICachePageConfig;
    if (len) {
      for (i = 0; i < len; i++) {
        if (appConfig?.cache?.pages[i].path && parse(appConfig?.cache?.pages[i].path).pattern.test(key)) {
          config = appConfig?.cache?.pages[i];
          if (config.expires === undefined) {
            config.expires = appConfig?.cache?.defaultExpires;
          }
          return config;
        }
      }
    }
    return null;
  }
}
