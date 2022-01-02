import conditionCodes from "../conditionCodes.json";
import isDaytime from "./isDaytime";

/**
 * Given a condition code and current time information, return an
 * appropriate condition name.
 *
 * Usually this will pretty much match the condition name returned by
 * the OpenWeather API. The main (only?) exception is that the "Clear"
 * (800) condition's name is "Sunny" during daylight hours.
 *
 * @param {Number} conditionCode The condition code.
 * @param {Number} timeUTC The current time (UTC).
 * @param {Number} todaySunriseUTC Today's sunrise time (UTC).
 * @param {Number} todaySunsetUTC Today's sunset time (UTC).
 * @param {Number} [tomorrowSunriseUTC] Tomorrow's sunrise time (UTC).
 * @param {Number} [tomorrowSunsetUTC] Tomorrow's sunset time (UTC).
 *
 * @returns {String} The condition name.
 */
export default function getConditionName(
    conditionCode,
    timeUTC,
    todaySunriseUTC,
    todaySunsetUTC,
    tomorrowSunriseUTC = null,
    tomorrowSunsetUTC = null
) {
    let conditionName = conditionCodes[conditionCode];

    if (!conditionName) conditionName = "Unknown";

    if (typeof conditionName !== "string") {
        // Day/night object; get appropriate string based on time of day
        conditionName = isDaytime(
            timeUTC,
            todaySunriseUTC,
            todaySunsetUTC,
            tomorrowSunriseUTC,
            tomorrowSunsetUTC
        )
            ? conditionName.day
            : conditionName.night;
    }

    return conditionName;
}
