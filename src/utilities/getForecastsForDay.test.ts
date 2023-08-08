// Fixtures
import { forecast } from "../testUtilities/testData";

// Helper functions
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";

// System under test
import getForecastsForDay from "./getForecastsForDay";

test("Returns all forecasts for a given day", () => {
    const forecastWeatherData = extractForecastWeatherData(forecast.json());

    const validForecasts = [
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01n",
            conditionName: "Clear",
            forecastTimeUTC: 1689681600,
            tempC: 9.65,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01n",
            conditionName: "Clear",
            forecastTimeUTC: 1689692400,
            tempC: 7.86,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01n",
            conditionName: "Clear",
            forecastTimeUTC: 1689703200,
            tempC: 3.7,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01n",
            conditionName: "Clear",
            forecastTimeUTC: 1689714000,
            tempC: -0.75,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01d",
            conditionName: "Sunny",
            forecastTimeUTC: 1689724800,
            tempC: 7.54,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01d",
            conditionName: "Sunny",
            forecastTimeUTC: 1689735600,
            tempC: 10.58,
        },
        {
            conditionCode: 800,
            conditionGroup: "Clear",
            conditionIcon: "01d",
            conditionName: "Sunny",
            forecastTimeUTC: 1689746400,
            tempC: 9.3,
        },
        {
            conditionCode: 802,
            conditionGroup: "Clouds",
            conditionIcon: "03n",
            conditionName: "Scattered clouds",
            forecastTimeUTC: 1689757200,
            tempC: 1.94,
        },
    ];

    expect(
        getForecastsForDay(
            forecastWeatherData,
            new Date("2023-07-18T12:00:00Z")
        )
    ).toStrictEqual(validForecasts);
});
