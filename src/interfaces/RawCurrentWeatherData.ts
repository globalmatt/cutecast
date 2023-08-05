export default interface RawCurrentWeatherData {
    name: string;
    id: number;
    weather: [
        {
            id: number;
            main: string;
            description: string;
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
