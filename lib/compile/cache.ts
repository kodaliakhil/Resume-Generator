type Entry = {
  key: string;
  pdf: Buffer;
  log: string;
  createdAt: number;
};
 
export class LruCache {
  private maxEntries: number;
  private map = new Map<string, Entry>();
 
  constructor(maxEntries = 64) {
    this.maxEntries = Math.max(8, maxEntries);
  }
 
  get(key: string): Entry | undefined {
    const v = this.map.get(key);
    if (!v) return undefined;
    // refresh LRU
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }
 
  set(key: string, pdf: Buffer, log: string) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, { key, pdf, log, createdAt: Date.now() });
    // evict
    while (this.map.size > this.maxEntries) {
      const firstKey = this.map.keys().next().value as string | undefined;
      if (!firstKey) break;
      this.map.delete(firstKey);
    }
  }
 
  size() {
    return this.map.size;
  }
 
  clear() {
    this.map.clear();
  }
}
 
// singleton cache for the app process
export const compileCache = new LruCache(64);