import { IGlobalData } from '~/lib/interface';
import { defineComponent, inject, reactive, toRefs } from 'vue';

export default defineComponent({
  components: {
  },
  setup () {
    const globalData: IGlobalData | undefined = inject('globalData');
    const state = reactive({
      userName: globalData?.userInfo?.userName || '',
      isLogin: globalData?.userInfo?.isLogin || false
    });

    return {
      ...toRefs(state)
    };
  }
});
