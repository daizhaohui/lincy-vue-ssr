<template>
  <MobilePageWrapper v-if="isMobileTemplate" />
  <PageWrapper v-else />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { initI18n, setLocale, useI18n } from '~/lib/utils/locale';
import PageWrapper from '../pageWrapper';
import MobilePageWrapper from '../mobile/pageWrapper';
import { Consts } from '~/lib/model';
import { updateAppData, IAppData } from '~/lib/model/appData';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

interface IState {
  isMobileTemplate: boolean
}

export default defineComponent({
  components: {
    PageWrapper,
    MobilePageWrapper
  },
  props: ['fetchData'],
  setup (props:any, context: any) {
    // eslint-disable-next-line no-undef
    const appData: IAppData = updateAppData(props, context, !!__isBrowser__);
    const state: IState = reactive({
      isMobileTemplate: appData.extensionContext.layoutTemplateName === Consts.LayoutTemplateName.Mobile
    });
    // 向子组件传递全局的数据（用户数据等),子组件通过inject('globalData')获取
    if (appData.extensionContext.language) {
      // 初始化多语言
      initI18n();
      setLocale(appData.extensionContext.language);
      // 注册多语言信息，在fetch.ts中返回
      if (appData.globalData.messages) {
        useI18n(appData.globalData.messages);
      }
    }
    return {
      ...toRefs(state)
    };
  }
});
</script>
