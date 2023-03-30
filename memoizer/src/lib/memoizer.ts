// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as hash from 'object-hash';

interface Options {
  cacheMaxSize: number;
}

export class Memoizer {
  protected cacheMaxSize: number;
  protected cache: Record<string, any> = {};
  protected cacheHashStrs: string[] = [];

  constructor({ cacheMaxSize }: Options) {
    this.cacheMaxSize = cacheMaxSize;
  }

  memoizeFn = <T extends (...args: any[]) => any>(fn: T): T => {
    let { addToCache } = this;
    const { cache } = this;
    addToCache = addToCache.bind(this);

    return function (...args) {
      const hashStr = hash([fn, args]);
      if (hashStr in cache) {
        return cache[hashStr];
      }

      const result = fn(...args);
      addToCache(hashStr, result);

      return result;
    } as T;
  };

  private addToCache = (hashStr: string, value: any) => {
    this.cache[hashStr] = value;
    this.cacheHashStrs.push(hashStr);

    if (this.cacheHashStrs.length > this.cacheMaxSize) {
      this.removeLastElementFromCache();
    }
  };

  private removeLastElementFromCache = () => {
    const hashStr = this.cacheHashStrs.shift();
    if (hashStr) {
      delete this.cache[hashStr];
    }
  };
}
