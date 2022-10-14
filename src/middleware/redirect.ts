import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/web';
import Redirect from '~/lib/middleware/redirect';
@Provide()
export class RedirectMiddleware implements IWebMiddleware {
  resolve () {
    return Redirect;
  }
}
