import { Provide } from '@midwayjs/decorator';
import { ISearchService } from '~/lib/interface';
import { get } from '~/lib/request/server';

@Provide()
export class SearchService implements ISearchService {
  async getData (key: string): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }
}
