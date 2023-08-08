// System under test
import getHour from "./getHour";

test("Returns 12am", () => {
    expect(getHour(1689775200)).toBe("12am");
});

test("Returns 9am", () => {
    expect(getHour(1689811199)).toBe("9am");
});

test("Returns 10am", () => {
    expect(getHour(1689811200)).toBe("10am");
});

test("Returns 10am", () => {
    expect(getHour(1689811201)).toBe("10am");
});

test("Returns 12pm", () => {
    expect(getHour(1689818400)).toBe("12pm");
});

test("Returns 10pm", () => {
    expect(getHour(1689854400)).toBe("10pm");
});
