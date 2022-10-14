import { ISearchService } from '~/lib/interface';
import { get } from '~/lib/request/browser';

class SearchService implements ISearchService {
  async getData (key: string, page: number, pageSize: number): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }
}

export default new SearchService();
