import { Configuration } from '@midwayjs/decorator';
import * as cache from '@midwayjs/cache'; // 导入cacheComponent模块
import { join } from 'path';

@Configuration({
  imports: [
    cache // 导入 cache 组件
  ],
  importConfigs: [join(__dirname, 'config')]
})
export class ContainerLifeCycle {};
