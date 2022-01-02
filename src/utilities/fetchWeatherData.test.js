import fetchWeatherData from "./fetchWeatherData";

test("Fetches some weather data", () => {
    return fetchWeatherData().then(([current, forecast]) => {
        expect(current).toEqual(
            expect.objectContaining({
                base: expect.anything(),
                cod: expect.any(Number),
                main: expect.any(Object),
                sys: expect.any(Object),
                weather: expect.any(Object),
            })
        );

        expect(forecast).toEqual(
            expect.objectContaining({
                city: expect.any(Object),
                cnt: expect.any(Number),
                cod: expect.any(String),
                list: expect.any(Array),
            })
        );
    });
});
