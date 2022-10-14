import { ISSRContext } from 'ssr-types';
import { FetchParams, IIndexService } from '~/lib/interface';
import { IndexService } from '@/service';

export default async ({ store, router }: FetchParams, ctx?: ISSRContext<{
  indexService?: IIndexService
}>) => {
  if (__isBrowser__) {
    return await IndexService.getData();
  } else {
    return await ctx?.indexService?.getData();
  }
};
