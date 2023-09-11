import { Some } from "../helpers/types/general";

/**
 * Cache is an object, that can store data for later use.
 * @template Records - The type of the records stored in the cache.
 * @template NonEmpty - Whether the cache is guaranteed to have values for all the keys.
 */
export interface Cache<Records extends Record<string, Some | null> = Record<string, Some | null>, NonEmpty extends true | false = false> {
    /**
     * Saves a value to the cache.
     * @param key The record key.
     * @param value The record value.
     */
    saveValue<Key extends keyof Records>(key: Key, value: Records[Key]): void;

    /**
     * Reads a value from the cache.
     * @param key The record key.
     * @returns The record value or undefined if the record does not exist.
     */
    readValue<Key extends keyof Records>(key: Key): NonEmpty extends true ? Records[Key] : Records[Key] | undefined;

    /**
     * Clears all the values from the cache.
     */
    clearAll(): void;

    /**
     * Clears a value from the cache.
     * @param key The record key.
     */
    clearValue<Key extends keyof Records>(key: Key): void;
}

/**
 * IterableCache is a cache that can be iterated over.
 */
export interface IterableCache<Records extends Record<string, Some | null> = Record<string, Some | null>, NonEmpty extends true | false = false> extends Cache<Records, NonEmpty> {

    /**
     * Iterates over the cache.
     */
    [Symbol.iterator](): IterableIterator<[keyof Records, NonEmpty extends true ? Records[keyof Records] : Records[keyof Records] | undefined]>;
}