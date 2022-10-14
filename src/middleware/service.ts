import { Provide, Inject } from '@midwayjs/decorator';
import { Context, IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { IExtensionContext, IGlobalService } from '~/lib/interface';
import { PageCacheService, ErrorHandler } from '~/lib/service';
import { ContextService } from '~/service/contextService';
@Provide()
export class GlobalServiceMiddleware implements IWebMiddleware {
  @Inject()
  globalService!: IGlobalService;

  @Inject()
  contextService!: ContextService;

  // ctx注入全局服务: 错误处理、页面缓存处理、获取全局数据
  resolve () {
    return async (ctx: Context, next: IMidwayWebNext) => {
      ctx.pageCacheService = new PageCacheService(this.contextService.getCacheManager());
      ctx.errorHandler = new ErrorHandler(this.contextService.getLogger(), ctx);
      const extensionContext: IExtensionContext = ctx.extensionContext;
      ctx.globalData = await this.globalService.getData(extensionContext);
      await next();
    };
  }
}
