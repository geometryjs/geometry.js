import { OptionsTransformer, setDefaults } from "../../src/helpers/options";

describe("setDefaults", () => {
    test("setDefaults should set the default values of the options", () => {
        const testObjects: {
            defaults: any;
            options: any;
            result: any;
        }[] = [
            {
                options: {
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        f: [
                            5
                        ]
                    }
                },
                defaults: {
                    a: 10,
                    c: {
                        r: 30,
                        f: [
                            50,
                            60,
                            {
                                a: 70
                            }
                        ]
                    }
                },
                result: {
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        r: 30,
                        f: [
                            5,
                            60,
                            {
                                a: 70
                            }
                        ]
                    }
                }
            }
        ];

        for (const testObject of testObjects) {
            expect(setDefaults(testObject.defaults, testObject.options)).toEqual(testObject.result);
        }
    });
});

describe("OptionsTransformer", () => {
    test("OptionsTransformer should set the default values of the options", () => {
        const testObjects: {
            defaults: any;
            runs: {
                options: any;
                result: any;
            }[]
        }[] = [
            {
                runs: [{
                    options:{
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        f: [
                            5
                        ]
                    }
                },
                result: {
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        r: 30,
                        f: [
                            5,
                            60,
                            {
                                a: 70
                            }
                        ]
                    }
                }
                }],
                
            defaults: {
                a: 10,
                c: {
                    r: 30,
                    f: [
                        50,
                        60,
                        {
                            a: 70
                        }
                    ]
                }
            },
            }
        ];

        for (const testObject of testObjects) {
            const optionsTransformer = new OptionsTransformer(testObject.defaults);
            for (const runs of testObject.runs) {
                expect(optionsTransformer.transform(runs.options)).toEqual(runs.result);
            }
        }
    });

    test("OptionsTransformer should not modify the default values", () => {
        const testObjects: {
            defaults: any;
            runs: {
                options: any;
                result: any;
            }[]
        }[] = [
            {
                runs: [{
                    options:{
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        f: [
                            5
                        ]
                    }
                },
                result: {
                    a: 1,
                    b: 2,
                    c: {
                        d: 3,
                        e: 4,
                        r: 30,
                        f: [
                            5,
                            60,
                            {
                                a: 70
                            }
                        ]
                    }
                }
                }],
                
            defaults: {
                a: 10,
                c: {
                    r: 30,
                    f: [
                        50,
                        60,
                        {
                            a: 70
                        }
                    ]
                }
            },
            }
        ];

        for (const testObject of testObjects) {
            const optionsTransformer = new OptionsTransformer(testObject.defaults);
            for (const runs of testObject.runs) {
                optionsTransformer.transform(runs.options);
                expect(optionsTransformer.defaultOptions).toEqual(testObject.defaults);
            }
        }
    });

    test("Evalute function in OptionsTransformer should call transform function", () => {
        const ot = new OptionsTransformer({});
        const mock = jest.fn();
        ot.transform = mock;

        ot.evaluate({});

        expect(mock).toBeCalledTimes(1);
    });
});