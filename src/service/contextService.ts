import { Provide, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { CacheManager } from '@midwayjs/cache';

// 在请求的上下文注入一些服务
@Provide()
export class ContextService {

  @Logger()
  logger!: ILogger;

  @Inject()
  cache!: CacheManager;

  getLogger (): ILogger {
    return this.logger;
  }

  getCacheManager (): CacheManager {
    return this.cache;
  }

}
