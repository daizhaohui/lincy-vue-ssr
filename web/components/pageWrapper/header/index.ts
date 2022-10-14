/* eslint-disable no-void */
import { IAppData, getAppData } from '~/lib/model/appData';
import { defineComponent, reactive, toRefs } from 'vue';
import { Input, Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { toUrl } from '~/lib/utils/url';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    'a-input': Input,
    'a-button': Button
  },
  setup () {
    const router = useRouter();
    const appData: IAppData = getAppData();
    const state = reactive({
      userName: appData?.globalData?.userInfo?.userName || '',
      isLogin: appData?.globalData?.userInfo?.isLogin || false,
      value: '',
      currentDate: dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss')
    });

    const onSearchAfter = (type: number) => {
      // 路由改变方式触发浏览器fetch逻辑（fetch.ts中 __isBrowser__中的逻辑）
      if (type === 1) {
        void router.push({
          path: '/search',
          query: {
            key: state.value
          }
        });
      } else if (type === 2) { // 重新请求页面地址(window.location.href=url)触发服务端fetch逻辑（fetch.ts中 非__isBrowser__中的逻辑）
        window.location.href = toUrl({
          path: '/search',
          query: {
            key: state.value,
            t: Date.now()
          }
        });
      }
    };

    return {
      ...toRefs(state),
      onSearchAfter
    };
  }
});
