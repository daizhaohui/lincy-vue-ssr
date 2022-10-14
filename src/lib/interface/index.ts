import { Store } from 'vuex';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { ICachePageConfig } from './IAppConfig';
export * from './IAppConfig';
export * from './IExtensionContext';

export * from './globalData';
export * from './globalService';

export interface IIndexService {
  getData: () => Promise<any>
};

export interface FetchParams {
  store: Store<any>
  router: RouteLocationNormalizedLoaded
}

export interface IPageCacheService {
  set: <T>(key: string, value: T, ttl?: number) => void
  get: <T>(key: string) => Promise<T>
  del: (key: string) => void
  isCached: (key: string) => boolean
  getConfig: (key: string) => ICachePageConfig | null
}

export interface ICachePageInfo {
  key: string
  config: ICachePageConfig
}

export interface ISearchService {
  getData: (key: string, page: number, pageSize: number) => Promise<any>
}
