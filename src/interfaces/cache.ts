import type { Some } from "../helpers/types/general";

/**
 * Cache is an object, that can store data records for later use.
 * @template Records - The type of the records stored in the cache.
 * @template NonEmpty - Whether the cache is guaranteed to have values for all the keys.
 */
export interface Cache<Records extends Record<string, Some | null> = Record<string, Some | null>, NonEmpty extends true | false = false> {
    /**
     * Saves a value to the cache.
     * @param key The record key.
     * @param value The record value.
     * @template Key - The type of the record key.
     */
    saveValue<Key extends keyof Records>(key: Key, value: Records[Key]): void;

    /**
     * Reads a value from the cache.
     * @param key The record key.
     * @returns The record value or undefined if the record does not exist.
     * @template Key - The type of the record key.
     */
    readValue<Key extends keyof Records>(key: Key): NonEmpty extends true ? Records[Key] : Records[Key] | undefined;

    /**
     * Clears all the values from the cache.
     */
    clearAll(): void;

    /**
     * Clears a value from the cache.
     * @param key The record key.
     * @template Key - The type of the record key.
     */
    clearValue<Key extends keyof Records>(key: Key): void;

    /**
     * Checks whether the cache has a value for the specified key.
     * @param key The record key.
     * @returns Whether the cache has a value for the specified key.
     * @template Key - The type of the record key.
     */
    hasValue<Key extends keyof Records>(key: Key): boolean;
}

/**
 * IterableCache is a cache that can be iterated over.
 */
export interface IterableCache<Records extends Record<string, Some | null> = Record<string, Some | null>, NonEmpty extends true | false = false> extends Cache<Records, NonEmpty> {
    /**
     * Iterates over all the records in the cache.
     */
    [Symbol.iterator](): IterableIterator<[keyof Records, NonEmpty extends true ? Records[keyof Records] : Records[keyof Records] | undefined]>;
}
