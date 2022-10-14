import { ISSRContext } from 'ssr-types';
import { FetchParams, ISearchService } from '~/lib/interface';
import { SearchService } from '@/service';

export default async ({ store, router }: FetchParams, ctx?: ISSRContext<{
  searchService?: ISearchService
}>) => {
  const query: any = router.query;
  if (__isBrowser__) {
    return await SearchService.getData(query.key, query.page, query.pageSize);
  } else {
    return await ctx?.searchService?.getData(query.key, query.page, query.pageSize);
  }
};
