import type { IterableCache } from "../../interfaces";

import { Some } from "../types/general";

/**
 * Cache implementation that uses a Map to store the data.
 */
export class MemoryMapCache<Records extends Record<string, Some | null> = Record<string, Some>> implements IterableCache<Records> {
    protected readonly cache: Map<keyof Records, Records[keyof Records]> = new Map();

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

    public hasValue<Key extends keyof Records>(key: Key): boolean {
        return this.cache.has(key);
    }

    [Symbol.iterator](): IterableIterator<[keyof Records, Records[keyof Records]]> {
        return this.cache.entries();
    }
}

/**
 * Cache implementation that uses a Map to store the data. The values are calculated automatically if not present in the cache.
 */
export class MemoryMapCacheWithAutomaticCalculation<Records extends Record<string, Some | null> = Record<string, Some | null>> extends MemoryMapCache<Records> implements IterableCache<Records, true> {
    constructor(private readonly calculators: { [Key in keyof Records]: () => Records[Key] }) {
        super();
    }

    public readValue<Key extends keyof Records>(key: Key): Records[Key] {
        const cacheValue = this.cache.get(key) as Records[Key] | undefined;

        if (cacheValue !== undefined) return cacheValue;

        const calculatedValue = this.calculators[key]();
        this.cache.set(key, calculatedValue);

        return calculatedValue;
    }

    *[Symbol.iterator](): IterableIterator<[keyof Records, Records[keyof Records]]> {
        for (const key of Object.keys(this.calculators) as Array<keyof Records>) {
            yield [key, this.readValue(key)];
        }
    }
}
