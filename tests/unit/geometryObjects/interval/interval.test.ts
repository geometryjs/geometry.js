describe("UnboundInterval", () => {
    test("can be created", () => {
        const interval = new UnboundIn({
            start: {
                value: 1,
                closed: true,
            },
            end: {
                value: 2,
                closed: false,
            }
        });
        expect(interval).toBeDefined();
    });
});