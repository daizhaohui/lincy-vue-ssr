import { IMidwayWebNext } from '@midwayjs/web';
import { IExtensionContext } from '../interface';
import { Context } from 'egg';
import AppConfig from '~/app.config';
import { Consts } from '../model';

export default async function (ctx: Context, next: IMidwayWebNext) {
  const extensionContext: IExtensionContext = ctx.extensionContext as IExtensionContext;
  let redirectPath;
  if (AppConfig.locale.mode === Consts.LocaleMode.Prefix) {
    if (extensionContext.prefix === '') {
      redirectPath = `/${AppConfig.locale.defaultPath}${ctx.request.url}`;
    } else {
      redirectPath = '';
      if (extensionContext.isMobile && !extensionContext.isInWhiteList) {
        redirectPath = extensionContext.path.indexOf('/') === 0 ? extensionContext.path : `/${extensionContext.path}`;
        if (redirectPath.indexOf(`/${extensionContext.prefix}/mobile`) !== 0) {
          // 补充url非路径部分（参数）
          redirectPath = `/${extensionContext.prefix}/mobile${ctx.request.url.slice(ctx.request.url.indexOf(`/${extensionContext.prefix}`) + extensionContext.prefix.length + 1)}`;
        } else {
          redirectPath = '';
        }
      }
    }
  } else {
    redirectPath = '';
    if (extensionContext.isMobile && !extensionContext.isInWhiteList) {
      redirectPath = extensionContext.path.indexOf('/') === 0 ? extensionContext.path : `/${extensionContext.path}`;
      if (redirectPath.indexOf('/mobile') !== 0) {
        // 补充url非路径部分（参数）
        redirectPath = `/mobile${redirectPath}${ctx.request.url.slice(ctx.request.url.indexOf(redirectPath) + redirectPath.length)}`;
      } else {
        redirectPath = '';
      }
    }
  }
  if (redirectPath) {
    ctx.redirect(redirectPath);
  } else {
    await next();
  }
};
