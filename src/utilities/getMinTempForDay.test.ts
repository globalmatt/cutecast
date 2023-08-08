// Fixtures
import { forecast } from "../testUtilities/testData";

// Helper functions
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";

// System under test
import getMinTempForDay from "./getMinTempForDay";

test("Correctly returns the minimum temperature for a given day (1/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMinTempForDay(
            new Date("2023-07-18T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(-0.75);

    jest.useRealTimers();
});

test("Correctly returns the minimum temperature for a given day (2/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMinTempForDay(
            new Date("2023-07-19T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(-0.1);

    jest.useRealTimers();
});

test("Correctly returns the minimum temperature for a given day (3/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMinTempForDay(
            new Date("2023-07-20T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(3.76);

    jest.useRealTimers();
});

test("Correctly returns the minimum temperature for a given day (4/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getMinTempForDay(
            new Date("2023-07-21T12:00:00Z"),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual(0.25);

    jest.useRealTimers();
});
