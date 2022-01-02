/**
 * Calculate whether the given time is during the daytime.
 *
 * If the optional `tomorrowSunriseUTC` and `tomorrowSunsetUTC`
 * arguments are supplied, include tomorrow in the check also.
 *
 * @param {Number} timeUTC The current time (UTC).
 * @param {Number} todaySunriseUTC Today's sunrise time (UTC).
 * @param {Number} todaySunsetUTC Today's sunset time (UTC).
 * @param {Number} [tomorrowSunriseUTC] Tomorrow's sunrise time (UTC).
 * @param {Number} [tomorrowSunsetUTC] Tomorrow's sunset time (UTC).
 *
 * @returns {Boolean} True if the given time is during the daytime;
 * false if it's during the nighttime.
 */
export default function isDaytime(
    timeUTC,
    todaySunriseUTC,
    todaySunsetUTC,
    tomorrowSunriseUTC = null,
    tomorrowSunsetUTC = null
) {
    if (!tomorrowSunriseUTC || !tomorrowSunsetUTC) {
        return timeUTC > todaySunriseUTC && timeUTC <= todaySunsetUTC;
    } else {
        return (
            (timeUTC > todaySunriseUTC && timeUTC <= todaySunsetUTC) ||
            (timeUTC > tomorrowSunriseUTC && timeUTC <= tomorrowSunsetUTC)
        );
    }
}
