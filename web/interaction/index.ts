// 存放mobile和pc端公共的交互相关的代码逻辑

import IndexService from '@/service/indexService';

export interface IGood {
  goodsId: number
  goodsName: string
  goodsIntro: string
  goodsCoverImg: string
  sellingPrice: number
  tag: string
};

export interface IState {
  hotGoodses: IGood[]
};

export interface IResult {
  code: number // 1表示成功 0 表示失败
  message: string
}

export function addGood (): void {}
export async function delGood (ids?: string[]): Promise<IResult> {
  const result = await IndexService.delData();
  return await Promise.resolve({
    code: result ? 1 : 0,
    message: result ? '删除成功！' : '删除失败！'
  });
}
