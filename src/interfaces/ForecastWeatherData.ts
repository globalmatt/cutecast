import Forecast from "./Forecast";

export default interface ForecastWeatherData {
    cityName: string;
    cityId: number;
    forecasts: Forecast[];
}
