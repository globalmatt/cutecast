import getWeatherImageUrl from "./getWeatherImageUrl";

test("Returns a weather image URL", () => {
    expect(
        getWeatherImageUrl({
            cityName: "Sydney",
            cityId: 123,
            conditionCode: 800,
            sunriseUTC: Math.round(new Date().getTime() / 1000) - 1,
            sunsetUTC: Math.round(new Date().getTime() / 1000) + 43200,
            tempC: 30,
        })
    ).toEqual(expect.stringContaining("/images/"));
});

test("Returns null if a weather image was not found", () => {
    expect(
        getWeatherImageUrl({
            cityName: "Sydney",
            cityId: 123,
            conditionCode: -1,
            sunriseUTC: Math.round(new Date().getTime() / 1000) - 1,
            sunsetUTC: Math.round(new Date().getTime() / 1000) + 43200,
            tempC: 30,
        })
    ).toBe(null);
});
