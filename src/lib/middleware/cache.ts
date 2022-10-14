import { IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { IExtensionContext, IPageCacheService } from '../interface';

export default async function (ctx: Context, next: IMidwayWebNext) {
  const pageCacheService: IPageCacheService = ctx.pageCacheService;
  const extensionContext: IExtensionContext = ctx.extensionContext;
  // 页面缓存了，path去匹配缓存配置
  if (pageCacheService.isCached(extensionContext.path)) {
    const cache = await pageCacheService.get(extensionContext.path);
    if (cache) {
      // console.log(`page cache: ${cache as string}`);
      ctx.body = cache;
    } else {
      // 通知render渲染的时候去添加缓存
      ctx.toAddCache = {
        key: extensionContext.path, // 设置缓存的唯一key值
        config: pageCacheService.getConfig(extensionContext.path)
      };
      await next();
    }
  } else {
    await next();
  }
};
