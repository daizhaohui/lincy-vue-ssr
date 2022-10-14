/* eslint-disable no-template-curly-in-string */
import { Get, Inject, Provide, Controller } from '@midwayjs/decorator';
import { Context } from 'egg';
import { RouterPathPrefix, render, RouterPath } from '~/lib/utils/render';
import { IIndexService } from '~/lib/interface';
@Provide()
@Controller(RouterPathPrefix)
export class Index {
  @Inject()
  ctx!: Context;

  @Inject()
  indexService!: IIndexService;

  @Get(RouterPath('index'))
  @Get(RouterPath('index', true))
  async handler (): Promise<void> {
    try {
      this.ctx.indexService = this.indexService;
      const html = await render(this.ctx);
      this.ctx.body = html;
    } catch (error: any) {
      await this.ctx.errorHandler.handle(error);
    }
  }
}
