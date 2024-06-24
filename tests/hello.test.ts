import { greet } from "../src/hello";

test('greet returns "Hello, World!"', () => {
    expect(greet()).toBe("Hello, World!");
});