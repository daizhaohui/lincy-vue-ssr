import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/web';
import Cache from '~/lib/middleware/cache';

@Provide()
export class CacheMiddleware implements IWebMiddleware {
  resolve () {
    return Cache;
  }
}
