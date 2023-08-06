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
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: {
            main: string;
            id: number;
            icon: string;
            description: string;
        }[];
        clouds: Object;
        wind: Object;
        visibility: number;
        pop: number;
        rain: Object;
        sys: Object;
        dt_txt: string;
    }[];
}
