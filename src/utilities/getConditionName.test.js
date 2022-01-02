import getConditionName from "./getConditionName";

test("Returns a daytime condition name", () => {
    expect(
        getConditionName(
            800, // conditionCode
            10, // timeUTC
            1, // todaySunriseUTC,
            43200 // todaySunsetUTC
        )
    ).toBe("Sunny");
});

test("Returns a nighttime condition name", () => {
    expect(
        getConditionName(
            800, // conditionCode
            43201, // timeUTC
            1, // todaySunriseUTC,
            43200 // todaySunsetUTC
        )
    ).toBe("Clear");
});
