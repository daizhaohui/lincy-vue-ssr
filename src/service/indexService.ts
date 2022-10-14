import { Provide } from '@midwayjs/decorator';
import { IIndexService } from '~/lib/interface';
import { get } from '~/lib/request/server';

@Provide()
export class IndexService implements IIndexService {
  async getData (): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }
}
