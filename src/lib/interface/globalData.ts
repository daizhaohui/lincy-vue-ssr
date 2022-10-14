export interface IUserInfo {
  isLogin: boolean
  userName?: string
  email?: string
}

export interface ISeoMeta {
  name: string
  content: string
}

export interface ISeoLink {
  rel: string
  href: string
}

export interface ISeoData {
  title?: string
  metas?: ISeoMeta[]
  links?: ISeoLink[]
}

export interface IGlobalData {
  // 多语言信息
  messages?: any
  // seo 数据
  seo?: ISeoData
  // 用户信息
  userInfo?: IUserInfo
}
