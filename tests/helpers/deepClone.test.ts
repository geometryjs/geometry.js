import { deepClone } from "../../src/helpers/deepClone";
describe("deepClone", () => {
    test("Changes to cloned object should not affect original object", () => {
        const testObjects: {
            source: any;
            change: (source: any) => void;
        }[] = [
            {
                source: {
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        f: [
                            5,
                            6,
                            {
                                g: 7,
                                h: 8,
                            },
                        ],
                    },
                },
                change: (source) => {
                    source.a = 10;
                    source.c.d = 30;
                    source.c.f[2].g = 70;
                },
            },
        ];

        for (const testObject of testObjects) {
            const sourceJSON = JSON.stringify(testObject.source);
            const clone = deepClone(testObject.source);
            testObject.change(clone);
            expect(JSON.stringify(testObject.source)).toBe(sourceJSON);
            expect(testObject.source).not.toBe(clone);
        }
    });
});
