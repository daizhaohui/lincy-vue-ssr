import { defineComponent, reactive, toRefs } from 'vue';
import { Button, Table, message } from 'ant-design-vue';
import { IState, IGood, addGood, delGood, IResult } from '@/interaction/index';
import { IAppData, getAppData } from '~/lib/model/appData';

const columns = [
  {
    title: 'CoverImg',
    dataIndex: 'goodsCoverImg',
    slots: { customRender: 'cover' }
  },
  {
    title: 'Id',
    dataIndex: 'goodsId'
  },
  {
    title: 'Name',
    dataIndex: 'goodsName'
  },
  {
    title: 'Intro',
    dataIndex: 'goodsIntro'
  },
  {
    title: 'Price',
    dataIndex: 'sellingPrice'
  },
  {
    title: 'Tag',
    dataIndex: 'tag'
  }
];

export default defineComponent({
  components: {
    'a-button': Button,
    'a-table': Table
  },
  setup (props: any, context: any) {
    const appData: IAppData = getAppData();
    const globalData = appData.globalData;
    console.log(`globalData: ${JSON.stringify(globalData)}`);
    const fetchData = appData?.fetchData;
    console.log(`index page fetchData: ${JSON.stringify(fetchData)}`);
    const state: IState = reactive({
      hotGoodses: fetchData.result.hotGoodses as IGood[] || []
    });

    const onAdd = () => {
      alert('add');
      addGood();
    };
    const onDelete = async () => {
      const result: IResult = await delGood();
      if (result.code === 1) {
        await message.success(result.message);
      } else {
        await message.error(result.message);
      }
    };

    return {
      ...toRefs(state),
      columns,
      onAdd,
      onDelete
    };
  }
});
