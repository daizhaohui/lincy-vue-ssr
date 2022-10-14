import * as VueI18n from 'vue-i18n';
import AppConfig from '~/app.config';
import { getCurrentInstance } from 'vue';

const i18n: any = VueI18n.createI18n({
  // 默认配置
  locale: AppConfig.locale.default,
  messages: {},
  globalInjection: true,
  // 模式锁定，传统模式SSR有bug
  legacy: false
});

const initI18n = () => {
  const app = getCurrentInstance()?.appContext.app;
  app?.use(i18n);
};

const setLocale = (language: string): void => {
  const languages: string[] = Object.keys(AppConfig.locale.languageMap).map((key: string) => {
    return (AppConfig.locale.languageMap as any)[key];
  });
  if (languages.includes(language)) {
    i18n.global.locale = language;
  }
};

const getLocal = (): string => {
  return i18n.global.locale;
};

const useI18n = (messages: any): any => {
  if (messages) {
    return VueI18n.useI18n({
      useScope: 'global',
      [i18n.global.locale]: messages
    });
  }
  return VueI18n.useI18n();
};

// 多语言vue-i18n相关接口封装
export {
  initI18n,
  useI18n,
  getLocal,
  setLocale
};
