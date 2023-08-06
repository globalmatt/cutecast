import extractCurrentWeatherData from "./extractCurrentWeatherData";

test("Extracts raw weather data correctly", () => {
    expect(
        extractCurrentWeatherData({
            name: "Sydney",
            id: 123,
            weather: [
                {
                    main: "condition group",
                    id: 123,
                    icon: "condition icon",
                    description: "description",
                },
            ],
            sys: {
                sunrise: 1,
                sunset: 43200,
            },
            main: {
                temp: 30,
            },
        })
    ).toEqual({
        cityName: "Sydney",
        cityId: 123,
        conditionGroup: "condition group",
        conditionCode: 123,
        conditionIcon: "condition icon",
        conditionName: expect.anything(),
        sunriseUTC: 1,
        sunsetUTC: 43200,
        tempC: 30,
    });
});
