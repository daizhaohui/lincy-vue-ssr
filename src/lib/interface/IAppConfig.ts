export interface ICachePageConfig {
  path: string
  // 缓存过期时间（单位秒)
  expires?: number
}
export interface IAppConfig {
  // 语言配置
  locale: {
    // 语言区分模式，domain域名区分语言，prefix路径前缀区分语言
    mode: string
    // mode=prefix 有效
    defaultPath: ''
    // 支持的语言
    languageMap: any
    // 默认语言
    default: string
  }
  // 设计稿px（高）
  designPx: number
  // pc端浏览器最小宽度，小于等于该宽度将切换到移动版本
  toMobileWidth: number
  // 重定向
  redirect: {
    excludes: string []
  }
  // 当前环境  development开发、test测试、uat用户、production生产。 没有设置，会取process.Node.ENV
  env: string
  // 错误处理
  errorHandler: {
    // 发生异常是否降级到csr处理
    enableCsr: boolean
    // 错误处理页面
    errorPage: string
    // 错误处理输出的html
    ouputErrorHtml: (error: any, env: string) => string
  }
  // 页面缓存配置
  cache?: {
    // 是否启用缓存，默认为false
    enabled: boolean
    // 总的默认页面过期时间（单位秒）
    defaultExpires: number
    pages: ICachePageConfig[]
  }
}
