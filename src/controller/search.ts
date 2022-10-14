/* eslint-disable no-template-curly-in-string */
import { Get, Inject, Provide, Controller } from '@midwayjs/decorator';
import { Context } from 'egg';
import { RouterPathPrefix, RouterPath, render } from '~/lib/utils/render';
import { ISearchService } from '~/lib/interface';
@Provide()
@Controller(RouterPathPrefix)
export class Search {
  @Inject()
  ctx!: Context;

  @Inject()
  searchService!: ISearchService;

  @Get(RouterPath('search'))
  @Get(RouterPath('search', true))
  async handler (): Promise<void> {
    try {
      this.ctx.searchService = this.searchService;
      const html = await render(this.ctx);
      this.ctx.body = html;
    } catch (error: any) {
      await this.ctx.errorHandler.handle(error);
    }
  }
}
