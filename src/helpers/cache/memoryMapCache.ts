import { IterableCache } from "../../interfaces/cache";
import { Some } from "../types/general";

/**
 * Cache implementation that uses a Map to store the data.
 */
export class MemoryMapCache<Records extends Record<string, Some | null> = Record<string, Some>> implements IterableCache<Records> {
    private readonly cache: Map<keyof Records, Records[keyof Records]> = new Map();

    public saveValue<Key extends keyof Records>(key: Key, value: Records[Key]): void {
        this.cache.set(key, value);
    }

    public readValue<Key extends keyof Records>(key: Key): Records[Key] | undefined {
        return this.cache.get(key) as Records[Key] | undefined;
    }

    public clearAll(): void {
        this.cache.clear();
    }

    public clearValue<Key extends keyof Records>(key: Key): void {
        this.cache.delete(key);
    }

    [Symbol.iterator](): IterableIterator<[keyof Records, Records[keyof Records]]> {
        return this.cache.entries();
    }
}