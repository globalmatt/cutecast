import isDaytime from "./isDaytime";

test("Returns true if during daytime today", () => {
    expect(
        isDaytime(
            10, // timeUTC
            1, // todaySunriseUTC,
            43200 // todaySunsetUTC
        )
    ).toBe(true);
});

test("Returns true if during daytime tomorrow", () => {
    expect(
        isDaytime(
            10, // timeUTC
            1, // todaySunriseUTC,
            43200, // todaySunsetUTC
            86400 + 1, // tomorrowSunriseUTC,
            86400 + 43200 // tomorrowSunsetUTC
        )
    ).toBe(true);
});

test("Returns false if during nighttime", () => {
    expect(
        isDaytime(
            43201, // timeUTC
            1, // todaySunriseUTC,
            43200 // todaySunsetUTC
        )
    ).toBe(false);
});
