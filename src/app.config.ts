export default {
  // 语言配置
  locale: {
    // 语言区分模式，domain域名区分语言，prefix路径前缀区分语言， none无多语言
    mode: 'prefix',
    // mode=prefix有效
    defaultPath: 'en',
    // 支持的语言
    languageMap: {
      en: 'en_US',
      '127.0.0.1': 'en_US',
      localhost: 'en_US'
    },
    // 默认语言
    default: 'en_US'
  },
  // pc端浏览器最小宽度，小于等于该宽度将切换到移动版本
  toMobileWidth: 400,
  // 设计稿px（高）
  designPx: 375,
  redirect: {
    excludes: [] // '/:lan/example/:name‘ 或者 ’/example/:name‘
  },
  // 错误处理
  errorHandler: {
    // 发生异常是否降级到csr处理,enableCsr=true,errorPage和ouputErrorHtml无效
    enableCsr: false
    // 错误处理页面
    // errorPage: '',
    // 错误处理输出的html: (error: any, env: string) => string
    // ouputErrorHtml: (error: any, env: string) => {
    //   return `<html>
    //     <body>
    //       <div>${error}</div>
    //     </body>
    //   <html>`;
    // }
  },
  // },
  // 当前环境  development开发、test测试、uat用户、production生产。 没有设置，会取process.Node.ENV
  env: 'development',
  // 页面缓存配置
  cache: {
    // 启用缓存，默认为false
    enabled: true,
    // 默认页面过期时间（单位秒）
    defaultExpires: 60,
    // 需要缓存的页面
    pages: [{
      name: 'search',
      expires: 60 // 页面缓存时间，单位为秒，没有设置取defaultExpires的值
    }]
  },
  routes: {
    index: {
      path: '/'
    },
    search: {
      path: '/search'
    }
  }
};
