export default interface RawForecastWeatherData {
    city: {
        name: string;
        id: number;
        sunrise: number;
        sunset: number;
    };
    list: {
        dt: number;
        main: {
            temp: number;
        };
        weather: {
            main: string;
            id: number;
            icon: string;
        }[];
    }[];
}
