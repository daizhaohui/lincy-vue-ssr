import { defineComponent, reactive, toRefs } from 'vue';
import { IAppData, getAppData } from '~/lib/model/appData';
import { Input, List, Avatar } from 'ant-design-vue';
import { SearchService } from '@/service';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    'a-input-search': Input.Search,
    'a-list': List,
    'a-list-item': List.Item,
    'a-avatar': Avatar,
    'a-list-item-meta': List.Item.Meta
  },
  setup (props: any, context: any) {
    const route = useRoute();
    const appData: IAppData = getAppData();
    // const globalData = appData.globalData;
    const fetchData = appData?.fetchData;
    console.log(`fetchData: ${JSON.stringify(fetchData)}`);
    const state = reactive({
      list: fetchData.result.hotGoodses || [],
      searchValue: '',
      page: 1,
      pageSize: 3,
      currentDate: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    });

    const loadData = async () => {
      const data = await SearchService.getData(state.searchValue, state.page, state.pageSize);
      state.list = data.result.hotGoodses;
    };

    const pagination = {
      onChange: async (page: number) => {
        state.page = page;
        await loadData();
      },
      pageSize: state.pageSize
    };

    const onSearch = async (searchValue: string) => {
      state.searchValue = searchValue;
      await loadData();
    };

    const query: any = route.query;
    state.searchValue = query.key || '';

    return {
      ...toRefs(state),
      onSearch,
      pagination
    };
  }
});
