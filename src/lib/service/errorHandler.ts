import { Context } from 'egg';
import { render } from '~/lib/utils/render';
import { isDevelopment, getEnv } from '../utils/env';
import { ILogger } from '@midwayjs/logger';
import AppConfig from '~/app.config';
import { IAppConfig } from '../interface';

const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;

export class ErrorHandler {

  logger: ILogger;
  ctx: Context;

  constructor (logger: ILogger, ctx: Context) {
    this.logger = logger;
    this.ctx = ctx;
  }

  async handle (error: any) {
    const ops = {
      enableLog: true,
      enableCsr: appConfig?.errorHandler?.enableCsr
    };
    if (ops.enableCsr === undefined) {
      ops.enableCsr = !isDevelopment();
    }
    if (ops.enableLog) {
      this.logger.error(error);
    }
    if (ops.enableCsr) {
      this.ctx.toAddCache = null;
      const html = await render(this.ctx, {
        mode: 'csr'
      });
      this.ctx.body = html;
    } else {
      if (appConfig?.errorHandler?.errorPage) {
        this.ctx.redirect(appConfig?.errorHandler?.errorPage);
      } else if (appConfig?.errorHandler?.ouputErrorHtml) {
        this.ctx.body = appConfig?.errorHandler?.ouputErrorHtml(error, getEnv());
      } else {
        // 显示出错误
        this.ctx.body = error;
      }
    }
  }
}
