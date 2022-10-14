# 官方文档

官方文档请查看 [ssr框架](http://doc.ssr-fc.com/)

## getting start

```bash
npm start # 本地开发模式运行，单进程 支持 前端 HMR 前端静态资源走本地 webpack 服务
npm run prod # 模拟生产环境运行，多进程，前端资源走静态目录
npm run stop # 生产环境停止服务
```

# src目录(服务端代码)

## midwayjs框架约定

| 目录/文件 |  描述 |
| :----:| :----: |
| config | 配置目录 |
| controller | 控制器 |
| middleware | 中间件 |
| service | 服务 |
| configuration.ts | 入口及生命周期配置、组件管理 |
| app.ts | 启动入口文件 |

请参看midwayjs框架文档[https://midwayjs.org/docs/controller](https://midwayjs.org/docs/controller)

## 非midwayjs框架约定

| 目录/文件 |  描述 |
| :----:| :----: |
| locale | 多语言文件(*.json)存放目录 |
| lib | 服务端和浏览器客户端公共代码 |
| app.config.js | 扩展功能配置 |
| env.config.js | 环境变量配置文件 |
  
# web目录(浏览器客户端代码)

[ssr框架目录结构](http://doc.ssr-fc.com/docs/features$structure)

| 目录/文件 |  描述 |
| :----:| :----: |
| assets | 存放静态资源文件目录（图片、字体文件等） |
| components | 公共组件 |
| components/layout | ssr框架页面布局 |
| components/layout | mobile端公共组件 |
| interaction | 页面中交互的代码文件存放目录 |
| interface | 接口定义 |
| pages | 页面目录 |
| service | api接口服务 |
| common.less | 公共样式 |
| config.js | ssr框架功能配置文件 |
# src/lib目录(服务端和浏览器客户端公共代码)

| 目录/文件 |  描述 |
| :----:| :----: |
| components | 公共组件 |
| interface | 接口定义 |
| middleware | 服务端中间件 |
| model | 公共模型及常量定义 |
| request | 服务端和浏览器的http请求封装 |
| service | 服务端错误处理、缓存等服务 |
| utils | 常用的工具类 |

# 扩展功能

## 多语言

app.config.ts中的locale配置节点

### 通过子域名来区分多语言站点

- mode设置为domain
- 通过languageMap设置子域名与语言的对应关系，通过语言信息可以获取语言包信息
  
```js
{
  locale: {
    mode: 'domain'
  },
  languageMap: {
    'en.xxxx.com': 'en_US',
    'zh.xxxx.com': 'zh_CN',
  },
}
```

### 通过一级路径来区分多语言站点

- mode设置为prefix
- 通过languageMap设置一级路径与语言的对应关系，通过语言信息可以获取语言包信息
- 通过defaultPath设置默认路径（解析一级路径时没有匹配到languageMap设置的路径时，默认会取defaultPath设置的路径）
  
```js
{
  locale: {
    mode: 'prefix'
  },
  languageMap: {
    en: 'en_US'
  },
  defaultPath: 'en',
}
```

### 其他配置

- default设置默认语言（解析请求的url中没有匹配到语言，默认取default设置的语言)
- mode设置为'none'表示非多语言

## 移动端和桌面端页面切换

在桌面浏览器中，当浏览器浏览宽度小于某一个指定的宽度的时候自动切换到移动端页面效果，大于指定的宽度会自动切换回桌面端页面效果。

```js
{
  toMobileWidth: 400,
}
```

toMobileWidth设置小于等于0，将不会自动切换页面。

## 移动端自适应设置

designPx为设计稿的高度（px）

```js
{
  designPx: 375,
}
```

移动端H5自动根据屏幕的大小自适应页面的显示的元素大小。 在移动端开发H5请使用rem，换算公式为1rem = 10px

## 禁止页面自动跳转

根据手机浏览器、pc浏览器来自动跳转到pc浏览器H5页面或移动端H5页面。 pc浏览器H5页面和mobile端H5页面通过不同的路由来区分, mobile端H5页面多一个/mobile路径。
例子：mobile端页面/mobile/home, pc端页面/home。

如果pc端和mobile端想公共同一个页面，请设置redirect的excludes, 从定向中间件如果匹配excludes设置的路径，将不会根据浏览器是pc或mobile来自动跳转到对应的页面路径。

```js
{
   redirect: {
    excludes: ['/:lan/example/:name','/example/:name']
  },
}
```

## 错误处理

errorHandler配置节点

### 当服务端异常时，自动启动客户端渲染

```js
 errorHandler: {
    enableCsr: true
  }
```

### 当服务端异常时，自动跳转指定的异常页面

必须设置enableCsr=false

```js
 errorHandler: {
    enableCsr: false,
    errorPage: '/error'
  }
```

### 当服务端异常时，输出指定内容

必须设置： enableCsr: false, 没有设置errorPage（errorPage优先级高于ouputErrorHtml）

```js
 errorHandler: {
    enableCsr: false
    ouputErrorHtml: (error: any, env: string) => {
      return `<html>
        <body>
          <div>${error}</div>
        </body>
      <html>`;
    }
  },
```

## 环境变量

```js
{
  env: ''
}
```

根据env的值从env.config.js配置文件中获取对应的环境的变量值, env没有设置或者为空时取process.env.NODE_ENV的值

## 页面缓存

- cache节点配置

```js
{
  cache: {
    // 启用缓存，默认为false
    enabled: true,
    // 默认页面过期时间（单位秒）
    defaultExpires: 60,
    // 需要缓存的页面
    pages: [{
      path: '/:lan/search', // 页面路由
      expires: 60 // 页面缓存时间，单位为秒，没有设置取defaultExpires的值
    }]
  }
}
```

- 缓存存储设置

src/config/config.default.ts设置缓存存储
[https://midwayjs.org/docs/extensions/cache](缓存配置)

# 如何开发一个页面

## 第一步：创建页面请求控制器

- 添加src/controller/search.ts,
- 设置动态路由前缀,
- 添加路由路径（pc端和mobile端)
- 上下文绑定接口服务
- 渲染页面（调用 lib/utils/render封装的的渲染函数)
- 捕获异常，调用公共的错误处理函数ctx.errorHandler.handle（不调用公共的错误处理函数,app.conifg.js中errorHandler配置功能将无效)

```ts
@Provide()
// 设置动态路由前缀 
@Controller(RouterPathPrefix) 
export class Search {
  @Inject()
  ctx!: Context;

  @Inject()
  searchService!: ISearchService;

  // 添加路由路径
  @Get('/search') // pc端
  @Get('/mobile/search') // mobile端
  async handler (): Promise<void> {
    // 捕获异常
    try {
      // 绑定接口服务
      this.ctx.searchService = this.searchService;
      // 渲染页面
      const html = await render(this.ctx);
      this.ctx.body = html;
    } catch (error: any) {
      // 调用公共的错误处理函数
      await this.ctx.errorHandler.handle(error);
    }
  }
}

```

Provide, Inject 依赖注入请参见[依赖注入](https://midwayjs.org/docs/container)

## 第二步：添加接口服务

- src/lib/interface/目录下定义搜索服务接口

```ts
export interface ISearchService {
  getData: (key: string, page: number, pageSize: number) => Promise<any>
}

```

- 添加服务端搜索服务src/service/searchService.ts， 引用/lib/request/server的http请求封装接口

```ts
// 公共的接口定义
import { ISearchService } from '~/lib/interface';
// 服务端http请求
import { get } from '~/lib/request/server';

// 依赖注入服务
@Provide()
export class SearchService implements ISearchService {
  async getData (key: string): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }
}
```

- 添加浏览器客户端搜索服务web/service/searchService.ts， 引用/lib/request/browser的http请求封装接口

```ts
// 公共的接口定义
import { ISearchService } from '~/lib/interface';
// 浏览器http请求
import { get } from '~/lib/request/browser';

class SearchService implements ISearchService {
  async getData (key: string, page: number, pageSize: number): Promise<any> {
    const data = await get('/v1/index-infos');
    return await Promise.resolve({
      result: data.data
    });
  }
}
// 导出服务实例
export default new SearchService();
```

## 第三步：添加pc端页面

[http://doc.ssr-fc.com/docs/features$feRoutes](约定式页面路由)

- 添加web/pages/search目录
- 添加页面样式文件：web/pages/search/index.less
- 添加代码文件： web/pages/search/index.js
- 添加页面文件: web/pages/search/render.vue
- 添加数据请求文件:  web/pages/search/fetch.js

```ts
import { ISSRContext } from 'ssr-types';
import { FetchParams, ISearchService } from '~/lib/interface';
import { SearchService } from '@/service';

export default async ({ store, router }: FetchParams, ctx?: ISSRContext<{
  searchService?: ISearchService
}>) => {
  const query: any = router.query;
  // 浏览器请求（指定csr渲染或则ssr渲染降级到csr渲染会从浏览器端调用接口请求）
  if (__isBrowser__) {
    return await SearchService.getData(query.key, query.page, query.pageSize);
  } else {  // 服务端接口请求 （ssr）
    return await ctx?.searchService?.getData(query.key, query.page, query.pageSize);
  }
};

```

- pc端和mobile端公共的交互代码可以放到web/interaction, 如公共的状态接口定义、处理函数等

## 第四步：添加mobile端页面

[http://doc.ssr-fc.com/docs/features$feRoutes](约定式页面路由)

- 添加web/pages/mobile/search目录
- 添加页面样式文件：web/pages/mobile/search/index.less
- 添加代码文件： web/mobile/pages/search/index.js
- 添加页面文件: web/mobile/pages/search/render.vue
- 添加数据请求文件:  web/mobile/pages/search/fetch.js 同pc端
- pc端和mobile端公共的交互代码文件可以放到web/interaction目录中

## 第五步： 通过统一的接口获取数据

```ts
import { IAppData, getAppData } from '~/lib/model/appData';

const appData: IAppData = getAppData();

// IAppData定义
export interface IAppData {
  // 全局数据
  globalData: IGlobalData
  // 扩展的请求上下文信息
  extensionContext: IExtensionContext
  // 每个页面通过fetch.ts返回的数据
  fetchData?: any
};

// 全局数据定义 （可以修改源代码进行扩展）
export interface IGlobalData {
  // 多语言信息
  messages?: any
  // seo 数据
  seo?: ISeoData
  // 用户信息
  userInfo?: IUserInfo
}

//  扩展的请求上下文信息定义 （可以修改源代码进行扩展）
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
};

```

# 开发规范

## 目录引用

@为web根目录： @/service/searchService.ts 等价 /web/service/searchService.ts; ～为src目录: ~/lib/utils 等价 ～/lib/utils

- 使用@和～引用
- 图片路径请使用 @/assets/* ,不使用相对路径