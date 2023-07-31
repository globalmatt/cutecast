export default interface Forecast {
    forecastTimeUTC: number;
    conditionGroup: string;
    conditionCode: number;
    conditionIcon: string;
    conditionName: string;
    tempC: number;
}
