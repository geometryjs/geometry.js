import { MemoryMapCache, MemoryMapCacheWithAutomaticCalculation } from "../../../src/helpers/cache/memoryMapCache";
describe("MemoryMapCache", () => {
    const cache = new MemoryMapCache<{ a: string; b: number; c: bigint; d: (...args: any[]) => any; e: Array<number>; f: boolean; g: symbol }>();

    const G = Symbol("g");
    test("saveValues", () => {
        cache.saveValue("a", "a");
        cache.saveValue("b", 1);
        cache.saveValue("c", BigInt(1));
        cache.saveValue("d", () => {});
        cache.saveValue("e", [1, 2, 3]);
        cache.saveValue("f", true);
        cache.saveValue("g", G);
    });

    test("readValues", () => {
        expect(cache.readValue("a")).toBe("a");
        expect(cache.readValue("b")).toBe(1);
        expect(cache.readValue("c")).toBe(BigInt(1));
        expect(cache.readValue("d")).toBeInstanceOf(Function);
        expect(cache.readValue("e")).toEqual([1, 2, 3]);
        expect(cache.readValue("f")).toBe(true);
        expect(cache.readValue("g")).toBe(G);
    });

    test("clearValue", () => {
        for (const [key, _] of cache) {
            cache.clearValue(key);
            expect(cache.readValue(key)).toBeUndefined();
        }
    });

    test("afterClear no data to iterate over", () => {
        expect([...cache]).toEqual([]);
    });

    cache.saveValue("a", "a");
    cache.saveValue("b", 1);
    cache.saveValue("c", BigInt(1));
    cache.saveValue("d", () => {});
    cache.saveValue("e", [1, 2, 3]);
    cache.saveValue("f", true);
    cache.saveValue("g", G);

    test("hasValue", () => {
        for (const [key, value] of cache) {
            expect(cache.hasValue(key)).toBe(true);
        }
    });

    test("clearAll", () => {
        cache.clearAll();
        expect([...cache]).toEqual([]);
    });


});

describe("MemoryMapCacheWithAutomaticCalculation", () => {
    const G = Symbol("g");
    const calculators = {
        a: jest.fn(() => "a"),
        b: jest.fn(() => 1),
        c: jest.fn(() => BigInt(1)),
        d: jest.fn(() => () => {}),
        e: jest.fn(() => [1, 2, 3]),
        f: jest.fn(() => true),
        g: jest.fn(() => G),
    }
    const cache = new MemoryMapCacheWithAutomaticCalculation<{ a: string; b: number; c: bigint; d: (...args: any[]) => any; e: Array<number>; f: boolean; g: symbol }>(calculators);

    test("iterating over the cache calculates all the values", () => {
        let i = 0;
        for (const [key, value] of cache) {
            expect(cache.readValue(key)).toBe(value);
            expect(calculators[key]).toBeCalledTimes(1);
            i++;
        }
        expect(i).toBe(Object.keys(calculators).length); // All the values were iterated over
    });

    test("iterating over the cache again does not calculate any values", () => {
        for (const [key, value] of cache) {
            expect(cache.readValue(key)).toBe(value);
            expect(calculators[key]).toBeCalledTimes(1);
        }
    });

    test("clearValue clears the value", () => {
        for (const key of Object.keys(calculators) as Array<keyof typeof calculators>) {
            cache.clearValue(key);
            expect(cache.hasValue(key)).toBe(false);
        }
    });

    test("after clear data is calculated again", () => {
        for (const [key, value] of cache) {
            expect(cache.readValue(key)).toBe(value);
            expect(calculators[key]).toBeCalledTimes(2);
        }
    }); 

    test("clearAll clears all the values", () => {
        cache.clearAll();
        for (const key of Object.keys(calculators) as Array<keyof typeof calculators>) {
            expect(cache.hasValue(key)).toBe(false);
        }
    });
});