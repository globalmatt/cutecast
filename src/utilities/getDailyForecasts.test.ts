// Fixtures
import { current, forecast } from "../testUtilities/testData";

// Helper functions
import extractCurrentWeatherData from "../utilities/extractCurrentWeatherData";
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";

// System under test
import getDailyForecasts from "./getDailyForecasts";

test("Returns the daily forecasts from a given day onward", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    const currentWeatherData = extractCurrentWeatherData(current.json());
    const forecastWeatherData = extractForecastWeatherData(forecast.json());

    const validForecasts = [
        {
            weekday: "Wednesday",
            conditionName: "",
            conditionIcon: "04d",
            maxTempC: 14.82,
            minTempC: -0.1,
        },
        {
            weekday: "Thursday",
            conditionName: "",
            conditionIcon: "04d",
            maxTempC: 10.81,
            minTempC: 3.76,
        },
        {
            weekday: "Friday",
            conditionName: "",
            conditionIcon: "01d",
            maxTempC: 12.4,
            minTempC: 0.25,
        },
        {
            weekday: "Saturday",
            conditionName: "",
            conditionIcon: "10d",
            maxTempC: 8.75,
            minTempC: 1.72,
        },
    ];

    expect(
        getDailyForecasts(
            new Date("2023-07-18T12:00:00Z"),
            currentWeatherData,
            forecastWeatherData
        )
    ).toStrictEqual(validForecasts);

    jest.useRealTimers();
});
