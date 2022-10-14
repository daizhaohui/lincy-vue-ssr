import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware } from '@midwayjs/web';
import ExtensionContext from '~/lib/middleware/extensionContext';

@Provide()
export class ExtensionContextMiddleware implements IWebMiddleware {
  resolve () {
    return ExtensionContext;
  }
}
