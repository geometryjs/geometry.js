import { MemoryMapCache } from "../../../src/helpers/cache/memoryMapCache";
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

    test("clearAll", () => {
        cache.clearAll();
        expect([...cache]).toEqual([]);
    });
});
