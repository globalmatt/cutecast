import RawCurrentWeatherData from "../interfaces/RawCurrentWeatherData";
import RawForecastWeatherData from "../interfaces/RawForecastWeatherData";

export const current = {
    ok: true,
    json: () =>
        ({
            coord: {
                lon: 150.6,
                lat: -34.5833,
            },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01n",
                },
            ],
            base: "stations",
            main: {
                temp: 9.65,
                feels_like: 7.54,
                temp_min: 8.63,
                temp_max: 9.86,
                pressure: 1021,
                humidity: 68,
                sea_level: 1021,
                grnd_level: 933,
            },
            visibility: 10000,
            wind: {
                speed: 4.07,
                deg: 264,
                gust: 12.16,
            },
            clouds: {
                all: 8,
            },
            dt: 1689678752,
            sys: {
                type: 2,
                id: 2033627,
                country: "AU",
                sunrise: 1689627657,
                sunset: 1689663969,
            },
            timezone: 36000,
            id: 2151485,
            name: "Robertson",
            cod: 200,
        } as RawCurrentWeatherData),
};

export const forecast = {
    ok: true,
    json: () =>
        ({
            cod: "200",
            message: 0,
            cnt: 40,
            list: [
                {
                    dt: 1689681600,
                    main: {
                        temp: 9.65,
                        feels_like: 7.58,
                        temp_min: 7.39,
                        temp_max: 9.65,
                        pressure: 1021,
                        sea_level: 1021,
                        grnd_level: 933,
                        humidity: 68,
                        temp_kf: 2.26,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 7,
                    },
                    wind: {
                        speed: 3.98,
                        deg: 261,
                        gust: 12.34,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-18 12:00:00",
                },
                {
                    dt: 1689692400,
                    main: {
                        temp: 7.86,
                        feels_like: 6.16,
                        temp_min: 4.29,
                        temp_max: 7.86,
                        pressure: 1021,
                        sea_level: 1021,
                        grnd_level: 933,
                        humidity: 69,
                        temp_kf: 3.57,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 5,
                    },
                    wind: {
                        speed: 2.67,
                        deg: 256,
                        gust: 7.65,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-18 15:00:00",
                },
                {
                    dt: 1689703200,
                    main: {
                        temp: 3.7,
                        feels_like: 1.72,
                        temp_min: 0.73,
                        temp_max: 3.7,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 933,
                        humidity: 80,
                        temp_kf: 2.97,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 2,
                    },
                    wind: {
                        speed: 2.13,
                        deg: 281,
                        gust: 4.49,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-18 18:00:00",
                },
                {
                    dt: 1689714000,
                    main: {
                        temp: -0.75,
                        feels_like: -3.19,
                        temp_min: -0.75,
                        temp_max: -0.75,
                        pressure: 1025,
                        sea_level: 1025,
                        grnd_level: 935,
                        humidity: 88,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 0,
                    },
                    wind: {
                        speed: 1.89,
                        deg: 273,
                        gust: 3.12,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-18 21:00:00",
                },
                {
                    dt: 1689724800,
                    main: {
                        temp: 7.54,
                        feels_like: 6.43,
                        temp_min: 7.54,
                        temp_max: 7.54,
                        pressure: 1025,
                        sea_level: 1025,
                        grnd_level: 937,
                        humidity: 41,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 0,
                    },
                    wind: {
                        speed: 1.89,
                        deg: 210,
                        gust: 4.02,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-19 00:00:00",
                },
                {
                    dt: 1689735600,
                    main: {
                        temp: 10.58,
                        feels_like: 8.48,
                        temp_min: 10.58,
                        temp_max: 10.58,
                        pressure: 1023,
                        sea_level: 1023,
                        grnd_level: 936,
                        humidity: 30,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 0,
                    },
                    wind: {
                        speed: 2.35,
                        deg: 177,
                        gust: 3.91,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-19 03:00:00",
                },
                {
                    dt: 1689746400,
                    main: {
                        temp: 9.3,
                        feels_like: 8.7,
                        temp_min: 9.3,
                        temp_max: 9.3,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 935,
                        humidity: 39,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 3,
                    },
                    wind: {
                        speed: 1.65,
                        deg: 143,
                        gust: 2.6,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-19 06:00:00",
                },
                {
                    dt: 1689757200,
                    main: {
                        temp: 1.94,
                        feels_like: 1.94,
                        temp_min: 1.94,
                        temp_max: 1.94,
                        pressure: 1025,
                        sea_level: 1025,
                        grnd_level: 936,
                        humidity: 69,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03n",
                        },
                    ],
                    clouds: {
                        all: 36,
                    },
                    wind: {
                        speed: 0.82,
                        deg: 274,
                        gust: 1.35,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-19 09:00:00",
                },
                {
                    dt: 1689768000,
                    main: {
                        temp: 1.41,
                        feels_like: -0.16,
                        temp_min: 1.41,
                        temp_max: 1.41,
                        pressure: 1026,
                        sea_level: 1026,
                        grnd_level: 936,
                        humidity: 74,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03n",
                        },
                    ],
                    clouds: {
                        all: 27,
                    },
                    wind: {
                        speed: 1.51,
                        deg: 292,
                        gust: 1.4,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-19 12:00:00",
                },
                {
                    dt: 1689778800,
                    main: {
                        temp: 0.98,
                        feels_like: -0.4,
                        temp_min: 0.98,
                        temp_max: 0.98,
                        pressure: 1024,
                        sea_level: 1024,
                        grnd_level: 934,
                        humidity: 79,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 3,
                    },
                    wind: {
                        speed: 1.35,
                        deg: 296,
                        gust: 1.33,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-19 15:00:00",
                },
                {
                    dt: 1689789600,
                    main: {
                        temp: 0.38,
                        feels_like: -1.31,
                        temp_min: 0.38,
                        temp_max: 0.38,
                        pressure: 1023,
                        sea_level: 1023,
                        grnd_level: 933,
                        humidity: 83,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 3,
                    },
                    wind: {
                        speed: 1.49,
                        deg: 310,
                        gust: 1.35,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-19 18:00:00",
                },
                {
                    dt: 1689800400,
                    main: {
                        temp: -0.1,
                        feels_like: -2.07,
                        temp_min: -0.1,
                        temp_max: -0.1,
                        pressure: 1023,
                        sea_level: 1023,
                        grnd_level: 933,
                        humidity: 88,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 801,
                            main: "Clouds",
                            description: "few clouds",
                            icon: "02d",
                        },
                    ],
                    clouds: {
                        all: 23,
                    },
                    wind: {
                        speed: 1.63,
                        deg: 316,
                        gust: 1.45,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-19 21:00:00",
                },
                {
                    dt: 1689811200,
                    main: {
                        temp: 8.69,
                        feels_like: 7.88,
                        temp_min: 8.69,
                        temp_max: 8.69,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 933,
                        humidity: 43,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03d",
                        },
                    ],
                    clouds: {
                        all: 41,
                    },
                    wind: {
                        speed: 1.77,
                        deg: 326,
                        gust: 4.09,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-20 00:00:00",
                },
                {
                    dt: 1689822000,
                    main: {
                        temp: 14.82,
                        feels_like: 12.8,
                        temp_min: 14.82,
                        temp_max: 14.82,
                        pressure: 1015,
                        sea_level: 1015,
                        grnd_level: 930,
                        humidity: 17,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 804,
                            main: "Clouds",
                            description: "overcast clouds",
                            icon: "04d",
                        },
                    ],
                    clouds: {
                        all: 98,
                    },
                    wind: {
                        speed: 2.81,
                        deg: 292,
                        gust: 6.76,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-20 03:00:00",
                },
                {
                    dt: 1689832800,
                    main: {
                        temp: 12.81,
                        feels_like: 10.85,
                        temp_min: 12.81,
                        temp_max: 12.81,
                        pressure: 1015,
                        sea_level: 1015,
                        grnd_level: 929,
                        humidity: 27,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 804,
                            main: "Clouds",
                            description: "overcast clouds",
                            icon: "04d",
                        },
                    ],
                    clouds: {
                        all: 96,
                    },
                    wind: {
                        speed: 3.23,
                        deg: 283,
                        gust: 8.9,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-20 06:00:00",
                },
                {
                    dt: 1689843600,
                    main: {
                        temp: 7.35,
                        feels_like: 5.16,
                        temp_min: 7.35,
                        temp_max: 7.35,
                        pressure: 1016,
                        sea_level: 1016,
                        grnd_level: 929,
                        humidity: 40,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03n",
                        },
                    ],
                    clouds: {
                        all: 29,
                    },
                    wind: {
                        speed: 3.26,
                        deg: 290,
                        gust: 11.16,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-20 09:00:00",
                },
                {
                    dt: 1689854400,
                    main: {
                        temp: 5.66,
                        feels_like: 3.43,
                        temp_min: 5.66,
                        temp_max: 5.66,
                        pressure: 1017,
                        sea_level: 1017,
                        grnd_level: 929,
                        humidity: 48,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 801,
                            main: "Clouds",
                            description: "few clouds",
                            icon: "02n",
                        },
                    ],
                    clouds: {
                        all: 14,
                    },
                    wind: {
                        speed: 2.82,
                        deg: 284,
                        gust: 10.29,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-20 12:00:00",
                },
                {
                    dt: 1689865200,
                    main: {
                        temp: 6.16,
                        feels_like: 3.96,
                        temp_min: 6.16,
                        temp_max: 6.16,
                        pressure: 1017,
                        sea_level: 1017,
                        grnd_level: 929,
                        humidity: 52,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 1,
                    },
                    wind: {
                        speed: 2.92,
                        deg: 272,
                        gust: 9.98,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-20 15:00:00",
                },
                {
                    dt: 1689876000,
                    main: {
                        temp: 7.16,
                        feels_like: 5.49,
                        temp_min: 7.16,
                        temp_max: 7.16,
                        pressure: 1017,
                        sea_level: 1017,
                        grnd_level: 930,
                        humidity: 60,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03n",
                        },
                    ],
                    clouds: {
                        all: 33,
                    },
                    wind: {
                        speed: 2.46,
                        deg: 256,
                        gust: 9.77,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-20 18:00:00",
                },
                {
                    dt: 1689886800,
                    main: {
                        temp: 3.78,
                        feels_like: 1.22,
                        temp_min: 3.78,
                        temp_max: 3.78,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 931,
                        humidity: 86,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 802,
                            main: "Clouds",
                            description: "scattered clouds",
                            icon: "03d",
                        },
                    ],
                    clouds: {
                        all: 28,
                    },
                    wind: {
                        speed: 2.78,
                        deg: 268,
                        gust: 6.55,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-20 21:00:00",
                },
                {
                    dt: 1689897600,
                    main: {
                        temp: 9.4,
                        feels_like: 8.27,
                        temp_min: 9.4,
                        temp_max: 9.4,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 933,
                        humidity: 52,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 801,
                            main: "Clouds",
                            description: "few clouds",
                            icon: "02d",
                        },
                    ],
                    clouds: {
                        all: 20,
                    },
                    wind: {
                        speed: 2.28,
                        deg: 237,
                        gust: 3.98,
                    },
                    visibility: 10000,
                    pop: 0.04,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-21 00:00:00",
                },
                {
                    dt: 1689908400,
                    main: {
                        temp: 10.81,
                        feels_like: 9.07,
                        temp_min: 10.81,
                        temp_max: 10.81,
                        pressure: 1019,
                        sea_level: 1019,
                        grnd_level: 932,
                        humidity: 43,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 803,
                            main: "Clouds",
                            description: "broken clouds",
                            icon: "04d",
                        },
                    ],
                    clouds: {
                        all: 66,
                    },
                    wind: {
                        speed: 2.02,
                        deg: 177,
                        gust: 3.83,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-21 03:00:00",
                },
                {
                    dt: 1689919200,
                    main: {
                        temp: 10.14,
                        feels_like: 8.38,
                        temp_min: 10.14,
                        temp_max: 10.14,
                        pressure: 1019,
                        sea_level: 1019,
                        grnd_level: 932,
                        humidity: 45,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 803,
                            main: "Clouds",
                            description: "broken clouds",
                            icon: "04d",
                        },
                    ],
                    clouds: {
                        all: 70,
                    },
                    wind: {
                        speed: 1.61,
                        deg: 157,
                        gust: 3.55,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-21 06:00:00",
                },
                {
                    dt: 1689930000,
                    main: {
                        temp: 3.76,
                        feels_like: 2.49,
                        temp_min: 3.76,
                        temp_max: 3.76,
                        pressure: 1023,
                        sea_level: 1023,
                        grnd_level: 934,
                        humidity: 75,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 803,
                            main: "Clouds",
                            description: "broken clouds",
                            icon: "04n",
                        },
                    ],
                    clouds: {
                        all: 66,
                    },
                    wind: {
                        speed: 1.53,
                        deg: 259,
                        gust: 2.21,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-21 09:00:00",
                },
                {
                    dt: 1689940800,
                    main: {
                        temp: 4.34,
                        feels_like: 2.7,
                        temp_min: 4.34,
                        temp_max: 4.34,
                        pressure: 1024,
                        sea_level: 1024,
                        grnd_level: 935,
                        humidity: 71,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 803,
                            main: "Clouds",
                            description: "broken clouds",
                            icon: "04n",
                        },
                    ],
                    clouds: {
                        all: 63,
                    },
                    wind: {
                        speed: 1.91,
                        deg: 263,
                        gust: 4.71,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-21 12:00:00",
                },
                {
                    dt: 1689951600,
                    main: {
                        temp: 1.4,
                        feels_like: -0.53,
                        temp_min: 1.4,
                        temp_max: 1.4,
                        pressure: 1025,
                        sea_level: 1025,
                        grnd_level: 935,
                        humidity: 79,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 7,
                    },
                    wind: {
                        speed: 1.76,
                        deg: 270,
                        gust: 2.18,
                    },
                    visibility: 10000,
                    pop: 0.01,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-21 15:00:00",
                },
                {
                    dt: 1689962400,
                    main: {
                        temp: 0.26,
                        feels_like: -2.07,
                        temp_min: 0.26,
                        temp_max: 0.26,
                        pressure: 1024,
                        sea_level: 1024,
                        grnd_level: 934,
                        humidity: 86,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 4,
                    },
                    wind: {
                        speed: 1.93,
                        deg: 272,
                        gust: 2.52,
                    },
                    visibility: 10000,
                    pop: 0.01,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-21 18:00:00",
                },
                {
                    dt: 1689973200,
                    main: {
                        temp: 0.25,
                        feels_like: -2.14,
                        temp_min: 0.25,
                        temp_max: 0.25,
                        pressure: 1025,
                        sea_level: 1025,
                        grnd_level: 935,
                        humidity: 85,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 6,
                    },
                    wind: {
                        speed: 1.98,
                        deg: 282,
                        gust: 2.54,
                    },
                    visibility: 10000,
                    pop: 0.01,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-21 21:00:00",
                },
                {
                    dt: 1689984000,
                    main: {
                        temp: 9,
                        feels_like: 8.41,
                        temp_min: 9,
                        temp_max: 9,
                        pressure: 1024,
                        sea_level: 1024,
                        grnd_level: 936,
                        humidity: 47,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 5,
                    },
                    wind: {
                        speed: 1.59,
                        deg: 218,
                        gust: 2.9,
                    },
                    visibility: 10000,
                    pop: 0.01,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-22 00:00:00",
                },
                {
                    dt: 1689994800,
                    main: {
                        temp: 12.4,
                        feels_like: 10.66,
                        temp_min: 12.4,
                        temp_max: 12.4,
                        pressure: 1021,
                        sea_level: 1021,
                        grnd_level: 934,
                        humidity: 37,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 7,
                    },
                    wind: {
                        speed: 1.06,
                        deg: 171,
                        gust: 1.56,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-22 03:00:00",
                },
                {
                    dt: 1690005600,
                    main: {
                        temp: 10.69,
                        feels_like: 8.99,
                        temp_min: 10.69,
                        temp_max: 10.69,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 933,
                        humidity: 45,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 6,
                    },
                    wind: {
                        speed: 1.2,
                        deg: 117,
                        gust: 1.76,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-22 06:00:00",
                },
                {
                    dt: 1690016400,
                    main: {
                        temp: 2.95,
                        feels_like: 2.95,
                        temp_min: 2.95,
                        temp_max: 2.95,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 933,
                        humidity: 89,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 1,
                    },
                    wind: {
                        speed: 0.89,
                        deg: 330,
                        gust: 1,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-22 09:00:00",
                },
                {
                    dt: 1690027200,
                    main: {
                        temp: 2.18,
                        feels_like: 0.87,
                        temp_min: 2.18,
                        temp_max: 2.18,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 933,
                        humidity: 91,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 1,
                    },
                    wind: {
                        speed: 1.41,
                        deg: 304,
                        gust: 1.27,
                    },
                    visibility: 10000,
                    pop: 0,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-22 12:00:00",
                },
                {
                    dt: 1690038000,
                    main: {
                        temp: 1.89,
                        feels_like: 0.6,
                        temp_min: 1.89,
                        temp_max: 1.89,
                        pressure: 1021,
                        sea_level: 1021,
                        grnd_level: 932,
                        humidity: 92,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 0,
                    },
                    wind: {
                        speed: 1.37,
                        deg: 300,
                        gust: 1.23,
                    },
                    visibility: 10000,
                    pop: 0.01,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-22 15:00:00",
                },
                {
                    dt: 1690048800,
                    main: {
                        temp: 1.72,
                        feels_like: 1.72,
                        temp_min: 1.72,
                        temp_max: 1.72,
                        pressure: 1021,
                        sea_level: 1021,
                        grnd_level: 931,
                        humidity: 94,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01n",
                        },
                    ],
                    clouds: {
                        all: 0,
                    },
                    wind: {
                        speed: 1.13,
                        deg: 289,
                        gust: 1.08,
                    },
                    visibility: 10000,
                    pop: 0.07,
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-22 18:00:00",
                },
                {
                    dt: 1690059600,
                    main: {
                        temp: 1.76,
                        feels_like: 1.76,
                        temp_min: 1.76,
                        temp_max: 1.76,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 932,
                        humidity: 96,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 800,
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                        },
                    ],
                    clouds: {
                        all: 3,
                    },
                    wind: {
                        speed: 0.99,
                        deg: 276,
                        gust: 0.95,
                    },
                    visibility: 10000,
                    pop: 0.13,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-22 21:00:00",
                },
                {
                    dt: 1690070400,
                    main: {
                        temp: 8.65,
                        feels_like: 7.97,
                        temp_min: 8.65,
                        temp_max: 8.65,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 934,
                        humidity: 67,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 801,
                            main: "Clouds",
                            description: "few clouds",
                            icon: "02d",
                        },
                    ],
                    clouds: {
                        all: 17,
                    },
                    wind: {
                        speed: 1.63,
                        deg: 128,
                        gust: 3.41,
                    },
                    visibility: 10000,
                    pop: 0.15,
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-23 00:00:00",
                },
                {
                    dt: 1690081200,
                    main: {
                        temp: 8.75,
                        feels_like: 7.59,
                        temp_min: 8.75,
                        temp_max: 8.75,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 933,
                        humidity: 72,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 500,
                            main: "Rain",
                            description: "light rain",
                            icon: "10d",
                        },
                    ],
                    clouds: {
                        all: 92,
                    },
                    wind: {
                        speed: 2.17,
                        deg: 137,
                        gust: 4.01,
                    },
                    visibility: 10000,
                    pop: 0.65,
                    rain: {
                        "3h": 0.41,
                    },
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-23 03:00:00",
                },
                {
                    dt: 1690092000,
                    main: {
                        temp: 7.63,
                        feels_like: 6.01,
                        temp_min: 7.63,
                        temp_max: 7.63,
                        pressure: 1020,
                        sea_level: 1020,
                        grnd_level: 932,
                        humidity: 84,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 500,
                            main: "Rain",
                            description: "light rain",
                            icon: "10d",
                        },
                    ],
                    clouds: {
                        all: 92,
                    },
                    wind: {
                        speed: 2.51,
                        deg: 157,
                        gust: 5.67,
                    },
                    visibility: 10000,
                    pop: 0.79,
                    rain: {
                        "3h": 0.52,
                    },
                    sys: {
                        pod: "d",
                    },
                    dt_txt: "2023-07-23 06:00:00",
                },
                {
                    dt: 1690102800,
                    main: {
                        temp: 5.04,
                        feels_like: 5.04,
                        temp_min: 5.04,
                        temp_max: 5.04,
                        pressure: 1022,
                        sea_level: 1022,
                        grnd_level: 934,
                        humidity: 97,
                        temp_kf: 0,
                    },
                    weather: [
                        {
                            id: 500,
                            main: "Rain",
                            description: "light rain",
                            icon: "10n",
                        },
                    ],
                    clouds: {
                        all: 80,
                    },
                    wind: {
                        speed: 1.17,
                        deg: 204,
                        gust: 3.97,
                    },
                    visibility: 10000,
                    pop: 0.71,
                    rain: {
                        "3h": 0.39,
                    },
                    sys: {
                        pod: "n",
                    },
                    dt_txt: "2023-07-23 09:00:00",
                },
            ],
            city: {
                id: 2151485,
                name: "Robertson",
                coord: {
                    lat: -34.5833,
                    lon: 150.6,
                },
                country: "AU",
                population: 0,
                timezone: 36000,
                sunrise: 1689627657,
                sunset: 1689663969,
            },
        } as RawForecastWeatherData),
};
