import { IIndexService } from '~/lib/interface';
import { get } from '~/lib/request/browser';

class IndexService implements IIndexService {
  async getData (): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }

  async delData (): Promise<any> {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}

export default new IndexService();
