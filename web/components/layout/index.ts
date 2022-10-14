import { defineComponent, reactive, toRefs } from 'vue';
import ExtensionLayout from '~/lib/components/layout.vue';
import { ISeoMeta, ISeoLink } from '~/lib/interface';
import { initAppData, IAppData } from '~/lib/model/appData';
interface IState {
  title: string
  metas: ISeoMeta[]
  links: ISeoLink[]
}

export default defineComponent({
  components: {
    ExtensionLayout
  },
  setup (props: any, context: any) {
    const appData: IAppData = initAppData(props, context);
    const state: IState = reactive({
      title: '',
      metas: [],
      links: []
    });
    if (appData.globalData?.seo?.title) {
      state.title = appData.globalData.seo.title;
    }
    if (appData.globalData?.seo?.metas) {
      state.metas = appData.globalData.seo.metas;
    }
    if (appData.globalData?.seo?.links) {
      state.links = appData.globalData.seo.links;
    }
    return {
      ...toRefs(state)
    };
  }
});
