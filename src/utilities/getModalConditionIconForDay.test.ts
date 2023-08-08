// Fixtures
import { current, forecast } from "../testUtilities/testData";

// Helper functions
import extractForecastWeatherData from "../utilities/extractForecastWeatherData";
import extractCurrentWeatherData from "../utilities/extractCurrentWeatherData";

// System under test
import getModalConditionIconForDay from "./getModalConditionIconForDay";

test("Correctly returns the modal condition icon for a given day (1/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getModalConditionIconForDay(
            new Date("2023-07-18T12:00:00Z"),
            extractCurrentWeatherData(current.json()),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual("01d");

    jest.useRealTimers();
});

test("Correctly returns the modal condition icon for a given day (2/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getModalConditionIconForDay(
            new Date("2023-07-19T12:00:00Z"),
            extractCurrentWeatherData(current.json()),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual("04d");

    jest.useRealTimers();
});

test("Correctly returns the modal condition icon for a given day (3/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getModalConditionIconForDay(
            new Date("2023-07-20T12:00:00Z"),
            extractCurrentWeatherData(current.json()),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual("04d");

    jest.useRealTimers();
});

test("Correctly returns the modal condition icon for a given day (4/4)", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    expect(
        getModalConditionIconForDay(
            new Date("2023-07-21T12:00:00Z"),
            extractCurrentWeatherData(current.json()),
            extractForecastWeatherData(forecast.json())
        )
    ).toEqual("01d");

    jest.useRealTimers();
});

test("Throws error if the modal condition icon couldn't be found", async () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-07-18T12:00:00Z"));

    jest.doMock("../utilities/getForecastsForDay", () => {
        return jest.fn(() => []);
    });

    jest.isolateModules(() => {
        const getModalConditionIconForDay =
            require("./getModalConditionIconForDay").default;

        expect(() =>
            getModalConditionIconForDay(
                new Date("2023-07-18T12:00:00Z"),
                extractCurrentWeatherData(current.json()),
                extractForecastWeatherData(forecast.json())
            )
        ).toThrow(new Error("No modal condition icon found"));
    });

    jest.dontMock("../utilities/getForecastsForDay");

    jest.useRealTimers();
    console.error = oldConsoleError;
});
