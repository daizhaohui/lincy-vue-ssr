/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { provide, inject } from 'vue';
import { IGlobalData, IExtensionContext } from '~/lib/interface';

export interface IAppData {
  // 全局数据
  globalData: IGlobalData
  // 扩展的请求上下文信息
  extensionContext: IExtensionContext
  // 每个页面通过fetch.ts返回的数据
  fetchData?: any
};

export function getAppData (): IAppData {
  return {
    globalData: inject('globalData'),
    fetchData: inject('fetchData'),
    extensionContext: inject('extensionContext')
  } as IAppData;
};

export function initAppData (props: any, context: any): IAppData {
  const { attrs } = context;
  const extensionContext: IExtensionContext = attrs.ctx.extensionContext as IExtensionContext;
  const globalData: IGlobalData = attrs.ctx.globalData as IGlobalData;
  provide('extensionContext', extensionContext);
  provide('globalData', globalData);
  return {
    extensionContext,
    globalData
  };
};

export function updateAppData (props: any, context: any, isBrowser: boolean): IAppData {
  let extensionContext: IExtensionContext;
  let globalData: IGlobalData;
  let fetchData: any;
  if (isBrowser) {
    extensionContext = (window as any).__extensionContext__ as IExtensionContext;
    globalData = (window as any).__globalData__ as IGlobalData;
    fetchData = context.attrs.asyncData.value;
    provide('extensionContext', extensionContext);
    provide('globalData', globalData);
    provide('fetchData', fetchData);
  } else {
    fetchData = props.fetchData;
    extensionContext = inject('extensionContext') as IExtensionContext;
    globalData = inject('globalData') as IGlobalData;
    provide('fetchData', fetchData);
  }
  return {
    extensionContext,
    globalData,
    fetchData
  } as IAppData;
}
