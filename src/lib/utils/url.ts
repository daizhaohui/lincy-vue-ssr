export interface IUrlOptions {
  query?: any
  params?: any
  path: string
}

/**
 * 转换成完成的请求url地址
 * @param options 参数选项配置
 * @returns 字符串
 */
export function toUrl (options: IUrlOptions): string {
  let url = options.path;
  if (options.params) {
    Object.keys(options.params).forEach(k => {
      url = url.replace(`:${k}`, options.params[k]);
    });
  }
  if (options.query) {
    url = `${url}?${Object.keys(options.query).map(p => {
      return `${p}=${options.query[p]}`;
    }).join('&')}`;
  }
  return url;
};
