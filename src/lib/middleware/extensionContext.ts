import { IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { Consts } from '../model';
import { IAppConfig, IExtensionContext } from '../interface';
import { parse } from 'regexparam'; // https://github.com/lukeed/regexparam
import AppConfig from '~/app.config';
import AsyncLocalStorage from '../utils/asyncLocalStorage';

const isMobileBrowser = (ctx: Context): boolean => {
  const agent: string | undefined = ctx.request.headers['user-agent'];
  const str = agent?.toLowerCase().match(/(iphone|ipod|ipad|android)/);
  return !!str;
};

const getFirstPath = (ctx: Context): string => {
  const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
  let firstPath;
  firstPath = ctx.request.path === '' || ctx.request.path === '/' ? '' : ctx.request.path.split('/')[1];
  if (firstPath) {
    firstPath = !Object.keys(appConfig.locale.languageMap).includes(firstPath) ? '' : firstPath;
  }
  return firstPath;
};

const getLanguage = (ctx: Context): string | undefined => {
  const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
  let key: string;
  if (appConfig.locale.mode === Consts.LocaleMode.Prefix) {
    key = getFirstPath(ctx);
  } else if (appConfig.locale.mode === Consts.LocaleMode.Domain) {
    key = ctx.request.hostname;
  } else {
    key = '';
  }
  if (key) {
    return appConfig.locale.languageMap[key] ? appConfig.locale.languageMap[key] : appConfig.locale.default;
  }
  return undefined;
};

const isIsInWhiteList = (ctx: Context, appConfig: IAppConfig): boolean => {
  let i;
  let isMatch = false;
  const len = appConfig.redirect.excludes ? appConfig.redirect.excludes.length : 0;
  for (i = 0; i < len; i++) {
    isMatch = parse(appConfig.redirect.excludes[i]).pattern.test(ctx.request.path);
    if (isMatch) {
      break;
    }
  }
  return isMatch;
};

const getLayoutTemplateName = (isMobile: boolean, isInWhiteList: boolean): string => {
  // 路由路径在白名单定义，表示不会根据浏览器是手机浏览器而使用移动布局
  if (isMobile && isInWhiteList) {
    return Consts.LayoutTemplateName.Common;
  } else if (isMobile && !isInWhiteList) {
    return Consts.LayoutTemplateName.Mobile;
  } else {
    return Consts.LayoutTemplateName.Desktop;
  }
};

export default async function (ctx: Context, next: IMidwayWebNext) {
  // 是否访问移端页面 (默认是桌面端)
  const isMobile = isMobileBrowser(ctx);
  const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
  const isInWhiteList = isIsInWhiteList(ctx, appConfig);
  const extensionContext: IExtensionContext = {
    isMobile,
    isInWhiteList,
    url: ctx.request.url,
    path: ctx.request.path
  } as unknown as IExtensionContext;
  if (ctx.params.csr + '' === '1') {
    extensionContext.csr = 1;
  }
  extensionContext.language = getLanguage(ctx);
  extensionContext.prefix = getFirstPath(ctx);
  extensionContext.layoutTemplateName = getLayoutTemplateName(isMobile, isInWhiteList);
  extensionContext.headers = {
    cookie: ctx.headers.cookie || '',
    authorization: ctx.headers.authorization || ''
  };
  ctx.extensionContext = extensionContext;
  await AsyncLocalStorage.enable(async () => {
    AsyncLocalStorage.set('extensionContext', extensionContext);
    await next();
  });
};
