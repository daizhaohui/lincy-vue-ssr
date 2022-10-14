
<template>
  <meta v-if="!isMobileTemplate" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta v-if="isMobileTemplate" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta v-for="(item, index) in metas" :key="index" :name="item.name" :content="item.content">
  <link v-for="(item, index) in metas" :key="index" :name="item.rel" :content="item.href">
  <MobileScript v-if="isMobileTemplate" />
  <DesktopScript v-else />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, h, inject } from 'vue';
import { IExtensionContext, IAppConfig, IGlobalData } from '../interface';
import AppConfig from '~/app.config';
import { Consts } from '../model';

interface IState {
  isMobileTemplate: boolean
}
// 创建移动端和pc端窗口适配代码: 桌面浏览器屏幕尺寸大小时跳转到手机端版本
const createAdapterScript = (appConfig: IAppConfig, extensionContext: IExtensionContext, globalData: IGlobalData) => {
  return `(function(win,isInWhiteList,toMobileWidth,hasPrefix,isAutoAdapt){    
    var getUrlPath = function(url){var path = url.split('://')[1]; return path.slice(path.indexOf('/'));};
    var toUrl = function(path){win.location = path;};
    var toMobileOrPC = function(){
      var isMobileBrowser = !!win.navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);
      var path = getUrlPath(win.location.href);
      var firstPath = path.split('/')[1];
      var prefix = '/'+firstPath+'/mobile';
      var clientWidth = win.document.documentElement.clientWidth;
      if(isInWhiteList) return;
      if(isMobileBrowser){
        if(hasPrefix&&path.indexOf(prefix)!==0){toUrl(prefix + path.slice(('/'+firstPath).length));}
        else if(!hasPrefix&&path.indexOf('/mobile')!==0){toUrl('/mobile' + path);}
      }else{
        if(toMobileWidth<=0) return;
        if(hasPrefix){
          if(clientWidth>toMobileWidth){
            if(path.indexOf(prefix)===0){toUrl('/'+firstPath + path.slice(prefix.length));}
          } else {
            if(path.indexOf(prefix)!==0){toUrl(prefix + path.slice(('/'+firstPath).length));}
          }
        }else{
          if(clientWidth>toMobileWidth){
            if(path.indexOf('/mobile')===0){toUrl(path.split('/mobile')[1]);}
          } else {
            if(path.indexOf('/mobile')!==0){toUrl('/mobile' + path);}
          }
        }
      }
    };
    if(hasPrefix){window.prefix='${extensionContext.prefix}';}
    window.__extensionContext__= ${JSON.stringify(extensionContext)};
    window.__globalData__=${JSON.stringify(globalData)};
    if(isAutoAdapt){
      win.onresize = function(){ toMobileOrPC();};
      toMobileOrPC();
    }
  })(window,${extensionContext.isInWhiteList},${appConfig.toMobileWidth},${appConfig.locale.mode === Consts.LocaleMode.Prefix},${appConfig.locale.mode === Consts.LocaleMode.Prefix || appConfig.locale.mode === Consts.LocaleMode.Domain});`;
};

export default defineComponent({
  components: {
    DesktopScript: {
      render: () => {
        const extensionContext: IExtensionContext = inject('extensionContext') as IExtensionContext;
        const globalData: IGlobalData = inject('globalData') as IGlobalData;
        const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
        return h('script', {
          innerHTML: createAdapterScript(appConfig, extensionContext, globalData)
        });
      }
    },
    MobileScript: {
      render: () => {
        const extensionContext: IExtensionContext = inject('extensionContext') as IExtensionContext;
        const globalData: IGlobalData = inject('globalData') as IGlobalData;
        const appConfig: IAppConfig = AppConfig as unknown as IAppConfig;
        const remUnit = appConfig.designPx ? appConfig.designPx / 10 : 75;
        // 手机端rem自动计算
        let script = `!function(e,t){function n(){t.body?t.body.style.fontSize=12*o+"px":t.addEventListener("DOMContentLoaded",n)}function d(){var e=i.clientWidth/${remUnit};i.style.fontSize=e+"px"}var i=t.documentElement,o=e.devicePixelRatio||1;if(n(),d(),e.addEventListener("resize",d),e.addEventListener("pageshow",function(e){e.persisted&&d()}),o>=2){var a=t.createElement("body"),s=t.createElement("div");s.style.border=".5px solid transparent",a.appendChild(s),i.appendChild(a),1===s.offsetHeight&&i.classList.add("hairlines"),i.removeChild(a)}}(window,document);`;
        script = script + createAdapterScript(appConfig, extensionContext, globalData);
        return h('script', {
          innerHTML: script
        });
      }
    }
  },
  props: {
    metas: {
      type: Array,
      default: () => {
        return [];
      }
    },
    links: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup (props: any, context: any) {
    // 只会服务端渲染
    const extensionContext: IExtensionContext = inject('extensionContext') as IExtensionContext;
    const state: IState = reactive({
      isMobileTemplate: extensionContext.layoutTemplateName === Consts.LayoutTemplateName.Mobile
    });
    return {
      ...toRefs(state)
    };
  }
});

</script>
