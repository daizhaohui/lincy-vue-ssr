import { Provide } from '@midwayjs/decorator';
import { loggers } from '@midwayjs/logger';
import { IExtensionContext, IGlobalData, ISeoData, IGlobalService } from '~/lib/interface';
import path from 'path';
import fs from 'fs';

@Provide()
export class GlobalService implements IGlobalService {

  async getMessages (lan?: string): Promise<any> {
    let data = null;
    if (lan) {
      // 可以添加到缓存中去，下次从缓存中获取
      const fileName: string = path.resolve(__dirname, `../locale/${lan}.json`);
      if (fs.existsSync(fileName)) {
        data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
      }
    }
    return await Promise.resolve(data);
  }

  async getSeo (): Promise<ISeoData> {
    const data: ISeoData | null = {
      title: 'demo',
      links: [{
        rel: 'text',
        href: 'http://www.baidu.com'
      }],
      metas: [{
        name: 'keywords',
        content: 'demo, vue-ssr'
      },
      {
        name: 'title',
        content: 'demo'
      }
      ]
    } as ISeoData;
    // 可以添加到缓存中去，下次从缓存中获取
    return await Promise.resolve(data);
  }

  async getUserInfo (): Promise<any> {
    const data = {
      isLogin: true,
      userName: 'li,gang',
      email: 'gang.li@sina.com'
    };
    return await Promise.resolve(data);
  }

  async getData (extensionContext: IExtensionContext): Promise<any> {
    try {
      const globalData: IGlobalData = {} as IGlobalData;
      let data = await this.getMessages(extensionContext.language);
      if (data) {
        globalData.messages = data;
      }
      data = await this.getSeo();
      if (data) {
        globalData.seo = data;
      }
      data = await this.getUserInfo();
      if (data) {
        globalData.userInfo = data;
      }
      return await Promise.resolve(globalData);
    } catch (error) {
      loggers.getLogger('logger').error(error);
    }
  }
}
