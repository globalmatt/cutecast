import getMidnightTodayUTC from "./getMidnightTodayUTC";

test("Returns midnight today", () => {
    const midnightTodayUTC = new Date();
    midnightTodayUTC.setHours(0, 0, 0, 0);
    expect(getMidnightTodayUTC()).toEqual(midnightTodayUTC);
});
