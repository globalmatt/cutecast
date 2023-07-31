export default interface CurrentWeatherData {
    cityName: string;
    cityId: number;
    conditionGroup: string;
    conditionCode: number;
    conditionIcon: string;
    conditionName: string;
    tempC: number;
    sunriseUTC: number;
    sunsetUTC: number;
};