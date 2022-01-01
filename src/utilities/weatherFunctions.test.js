import {
    extractCurrentWeatherData,
    extractForecastWeatherData,
    preloadWeatherImages,
    getWeatherImageUrl,
    getAllImages,
} from "./weatherFunctions";

test("Returns weather image URLs", () => {
    expect(getAllImages()).toEqual(
        expect.arrayContaining([
            {
                url: "ellieNiceDayUnicorn.jpg",
                conditionCodes: [800, 801],
                daytime: true,
            },
            {
                url: "sunflowers.jpg",
                conditionCodes: [800, 801],
                daytime: true,
            },
        ])
    );
});
