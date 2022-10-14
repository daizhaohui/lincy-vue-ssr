export interface IExtensionContextHeaders {
  // 用户授权信息
  authorization: string
  // cookie值
  cookie: string
}

export interface IExtensionContext {
  // 是否移动端
  isMobile: boolean
  // 是否在白名单中 （app.config.js 中redirect.excludes)
  isInWhiteList: boolean
  // 完成的路径，不带参数
  path: string
  // 带参数的完整路径
  fullPath: string
  // 布局使用的模板名称
  layoutTemplateName: string
  // 前缀 (第一个路径表示语言标识)
  prefix?: string
  // 语言
  language?: string
  // 请求headers中值
  headers: IExtensionContextHeaders
  // 请求的url中指定为csr=1，客户端渲染.
  csr?: number
};
