import getConditionName from "./getConditionName";

test("Returns a condition name", () => {
    expect(
        getConditionName(
            800, // conditionCode
            10, // timeUTC
            1, // todaySunriseUTC,
            43200 // todaySunsetUTC
        )
    ).toBe("Sunny");
});
