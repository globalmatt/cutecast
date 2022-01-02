import extractForecastWeatherData from "./extractForecastWeatherData";

test("Extracts raw weather data correctly", () => {
    expect(
        extractForecastWeatherData({
            city: {
                name: "Sydney",
                id: 123,
                sunrise: 1,
                sunset: 43200,
            },
            list: [
                {
                    dt: new Date(),
                    weather: [
                        {
                            main: "condition group",
                            id: "condition code",
                            icon: "condition icon",
                        },
                    ],
                    main: {
                        temp: 30,
                    },
                },
            ],
        })
    ).toEqual({
        cityName: "Sydney",
        cityId: 123,
        forecasts: [
            {
                forecastTimeUTC: expect.anything(),
                conditionGroup: "condition group",
                conditionCode: "condition code",
                conditionIcon: "condition icon",
                conditionName: expect.anything(),
                tempC: 30,
            },
        ],
    });
});
