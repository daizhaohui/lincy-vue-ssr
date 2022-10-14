import { defineComponent, reactive, toRefs } from 'vue';
import { IAppData, getAppData } from '~/lib/model/appData';
import { Search, List, Cell, Image } from 'vant';
import { SearchService } from '@/service';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    'van-search': Search,
    'van-list': List,
    'van-cell': Cell,
    'van-image': Image
  },
  setup (props: any, context: any) {
    const route = useRoute();
    const appData: IAppData = getAppData();
    const fetchData = appData?.fetchData;
    const state = reactive({
      list: fetchData.result.hotGoodses || [],
      searchValue: '',
      page: 1,
      pageSize: 6,
      currentDate: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      loading: false,
      finished: false
    });

    const onLoad = async () => {
      state.loading = false;
      state.page = state.page + 1;
      const data = await SearchService.getData(state.searchValue, state.page, state.pageSize);
      for (let i = 0; i < data.result.hotGoodses.length; i++) {
        state.list.push(data.result.hotGoodses[i]);
      }
      // 数据全部加载完成
      if (state.list.length >= 30) {
        state.finished = true;
      }
    };

    const onSearch = async (searchValue: string) => {
      state.searchValue = searchValue;
      state.page = 1;
      state.finished = false;
      const data = await SearchService.getData(state.searchValue, state.page, state.pageSize);
      state.list = data.result.hotGoodses;
    };

    const query: any = route.query;
    state.searchValue = query.key || '';

    return {
      ...toRefs(state),
      onSearch,
      onLoad
    };
  }
});
