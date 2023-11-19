import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const cache = new CacheContainer(new MemoryStorage());

export function cached(cacheName: string) {
    return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
        async function replacementMethod(this: any, ...args: any[]) {
            const cachedData = await cache.getItem(`${cacheName}-${args.join('-')}`);
            
            if (cachedData) {
                console.log("cached data", cachedData)
                return cachedData;
            }

            const result = originalMethod.call(this, ...args);
            await cache.setItem(`${cacheName}-${args.join('-')}`, result, { ttl: 86400 });
            console.log("fetched data")
            return result;
        }

        return replacementMethod;
    }
}