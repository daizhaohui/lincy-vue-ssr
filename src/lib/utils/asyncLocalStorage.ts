import { AsyncLocalStorage } from 'async_hooks';
// 直接创建一个 asyncLocalStorage 存储实例，不再需要管理 async 生命周期钩子
const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();
const storage = {
  async enable (callback: any): Promise<void> {
    // 使用 run 方法创建全新的存储，且需要让后续操作作为 run 方法的回调执行，以使用全新的异步资源上下文
    await asyncLocalStorage.run(new Map<string, any>(), callback);
  },
  set<T>(key: string, value: T) {
    const store: Map<string, any> = asyncLocalStorage.getStore() as unknown as Map<string, any>;
    store.set(key, value);
  },
  get<T>(key: string): T {
    const store: Map<string, any> = asyncLocalStorage.getStore() as unknown as Map<string, any>;
    return store.get(key);
  }
};

export default storage;
