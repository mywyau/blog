import { greet, greet_tomy } from "../src/hello";

test('greet returns "Hello, World!"', () => {
    expect(greet()).toBe("Hello, World!");
});

test('greet_tomy returns "Hello, Tomy!"', () => {
    expect(greet_tomy()).toBe("Hello, Tomy!");
});