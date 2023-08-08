// Fixtures
import { forecast } from "../testUtilities/testData";

// Helper functions
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";

// System under test
import getNext24HoursForecasts from "./getNext24HoursForecasts";

test("Correctly returns the next 24 hours of forecasts from 2023-07-18T11:59:00Z", async () => {
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
        getNext24HoursForecasts(
            extractForecastWeatherData(forecast.json()),
            Math.round(new Date("2023-07-18T11:59:00Z").getTime() / 1000)
        )
    ).toStrictEqual(validForecasts);
});

test("Correctly returns the next 24 hours of forecasts from 2023-07-18T12:00:00Z", async () => {
    const validForecasts = [
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
        getNext24HoursForecasts(
            extractForecastWeatherData(forecast.json()),
            Math.round(new Date("2023-07-18T12:00:00Z").getTime() / 1000)
        )
    ).toStrictEqual(validForecasts);
});

test("Correctly returns the next 24 hours of forecasts from 2023-07-18T16:01:02Z", async () => {
    const validForecasts = [
        {
            forecastTimeUTC: 1689703200,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01n",
            conditionName: "Clear",
            tempC: 3.7,
        },
        {
            forecastTimeUTC: 1689714000,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01n",
            conditionName: "Clear",
            tempC: -0.75,
        },
        {
            forecastTimeUTC: 1689724800,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01d",
            conditionName: "Sunny",
            tempC: 7.54,
        },
        {
            forecastTimeUTC: 1689735600,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01d",
            conditionName: "Sunny",
            tempC: 10.58,
        },
        {
            forecastTimeUTC: 1689746400,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01d",
            conditionName: "Sunny",
            tempC: 9.3,
        },
        {
            forecastTimeUTC: 1689757200,
            conditionGroup: "Clouds",
            conditionCode: 802,
            conditionIcon: "03n",
            conditionName: "Scattered clouds",
            tempC: 1.94,
        },
        {
            forecastTimeUTC: 1689768000,
            conditionGroup: "Clouds",
            conditionCode: 802,
            conditionIcon: "03n",
            conditionName: "Scattered clouds",
            tempC: 1.41,
        },
        {
            forecastTimeUTC: 1689778800,
            conditionGroup: "Clear",
            conditionCode: 800,
            conditionIcon: "01n",
            conditionName: "Clear",
            tempC: 0.98,
        },
    ];

    expect(
        getNext24HoursForecasts(
            extractForecastWeatherData(forecast.json()),
            Math.round(new Date("2023-07-18T16:01:02Z").getTime() / 1000)
        )
    ).toStrictEqual(validForecasts);
});
