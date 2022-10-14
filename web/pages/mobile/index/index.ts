import { defineComponent, reactive, toRefs } from 'vue';
import { IState, IGood, addGood, delGood, IResult } from '@/interaction/index';
import { Button, List, Cell, Toast } from 'vant';

export default defineComponent({
  components: {
    'van-button': Button,
    'van-list': List,
    'van-cell': Cell
  },
  setup (props: any) {
    const state: IState = reactive({
      hotGoodses: props.fetchData.result.hotGoodses as IGood[] || []
    });

    const onAdd = () => {
      alert('add');
      addGood();
    };
    const onDelete = async () => {
      const result: IResult = await delGood();
      if (result.code === 1) {
        await Toast.success(result.message);
      } else {
        await Toast.fail(result.message);
      }
    };

    return {
      ...toRefs(state),
      onAdd,
      onDelete
    };
  }
});
