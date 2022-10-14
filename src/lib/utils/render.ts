import { Readable } from 'stream';
import { render as VueRender } from 'ssr-core-vue3';
import { Context } from 'egg';
import { IExtensionContext, ICachePageInfo, IPageCacheService } from '../interface';
import { Consts } from '../model';
import AppConfig from '~/app.config';

const createOptions = (ctx: Context, options: any, isStream: boolean): any => {
  const extensionContext: IExtensionContext = ctx.extensionContext as IExtensionContext;
  const mode = extensionContext.csr ? 'csr' : 'ssr';
  const ops: any = options ? {
    mode,
    stream: isStream,
    ...options
  } : {
    mode,
    stream: isStream
  };
  if (AppConfig.locale.mode === Consts.LocaleMode.Prefix) {
    ops.prefix = extensionContext.prefix;
  }
  return ops;
};

const addCache = (ctx: Context, value: string | Readable) => {
  const cachePageInfo: ICachePageInfo | undefined = ctx?.toAddCache;
  const pageCacheService: IPageCacheService = ctx.pageCacheService;
  if (cachePageInfo) {
    pageCacheService.set(cachePageInfo.key, value, cachePageInfo.config.expires);
  }
};

const toAddCache = (ctx: Context): boolean => {
  return !!ctx?.toAddCache;
};

// 路由的前缀，如果是多语言网站会添加动态的语言路径
const RouterPathPrefix: string = AppConfig.locale.mode && AppConfig.locale.mode === Consts.LocaleMode.Prefix ? '/:lan' : '/';
const RouterPath = (name: string, isMobile = false): string => {
  const routes: any = AppConfig.routes;
  return isMobile ? `/mobile${routes[name].path}` : `${routes[name].path}`;
};

// 根据上下文，渲染页面。 如果页面需要缓存，把渲染的结果添加缓存中
async function render (ctx: Context, options?: any): Promise<Readable|string> {
  let value;
  if (toAddCache(ctx)) {
    value = await VueRender(ctx, createOptions(ctx, options, false));
    addCache(ctx, value);
  } else {
    value = await VueRender<Readable>(ctx, createOptions(ctx, options, true));
  }
  return await Promise.resolve(value);
};

async function renderToString (ctx: Context, options?: any): Promise<string> {
  const value = await VueRender(ctx, createOptions(ctx, options, false));
  if (toAddCache(ctx)) {
    addCache(ctx, value);
  }
  return await Promise.resolve(value);
};

export {
  RouterPathPrefix,
  RouterPath,
  render,
  renderToString
};
