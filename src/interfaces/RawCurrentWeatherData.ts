export default interface RawCurrentWeatherData {
    name: string;
    id: number;
    weather: [
        {
            main: string;
            id: number;
            icon: string;
        }
    ];
    main: {
        temp: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
}
