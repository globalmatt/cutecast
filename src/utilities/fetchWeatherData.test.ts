import fetchWeatherData from "./fetchWeatherData";
import { current, forecast } from "../testUtilities/testData";

test("Fetches some weather data", async () => {
    // Mock the fetch API request.

    global.fetch = jest
        .fn()
        .mockResolvedValueOnce(current)
        .mockResolvedValueOnce(forecast);

    const results = await fetchWeatherData(0);
    expect(typeof results).not.toBe("boolean");

    if (typeof results !== "boolean") {
        expect(results[0]).toEqual(
            expect.objectContaining({
                base: expect.anything(),
                cod: expect.any(Number),
                main: expect.any(Object),
                sys: expect.any(Object),
                weather: expect.any(Object),
            })
        );

        expect(results[1]).toEqual(
            expect.objectContaining({
                city: expect.any(Object),
                cnt: expect.any(Number),
                cod: expect.any(String),
                list: expect.any(Array),
            })
        );
    }
});

test("Throws error when currentWeather fetch doesn't return an `ok` status", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 404 });
    await expect(() => fetchWeatherData(0)).rejects.toThrow(new Error("404"));
});

test("Throws error when forecastWeather fetch doesn't return an `ok` status", async () => {
    global.fetch = jest
        .fn()
        .mockResolvedValueOnce(current)
        .mockResolvedValueOnce({ status: 404 });
    await expect(() => fetchWeatherData(0)).rejects.toThrow(new Error("404"));
});

test("Fetching is throttled", async () => {
    const oldConsoleWarn = console.warn;
    console.warn = jest.fn();

    global.fetch = jest
        .fn()
        .mockResolvedValueOnce(current)
        .mockResolvedValueOnce(forecast);

    const result = await fetchWeatherData(new Date().getTime());
    expect(result).toBe(false);
    console.warn = oldConsoleWarn;
});
