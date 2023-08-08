// Fixtures
import { forecast } from "../testUtilities/testData";

// Helper functions
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";

// System under test
import getMaxTempForDay from "./getMaxTempForDay";

test("Correctly returns the maximum temperature for a given day (1/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMaxTempForDay(
            new Date("2023-07-18T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(10.58);

    jest.useRealTimers();
});

test("Correctly returns the maximum temperature for a given day (2/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMaxTempForDay(
            new Date("2023-07-19T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(14.82);

    jest.useRealTimers();
});

test("Correctly returns the maximum temperature for a given day (3/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMaxTempForDay(
            new Date("2023-07-20T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(10.81);

    jest.useRealTimers();
});

test("Correctly returns the maximum temperature for a given day (4/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMaxTempForDay(
            new Date("2023-07-21T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(12.4);

    jest.useRealTimers();
});
