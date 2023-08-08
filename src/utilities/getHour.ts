/**
 * Given a UTC Unix timestamp, return a string representing the hours
 * component of the time, in 12-hour format, in the local time zone.
 *
 * @param {number} timeUTC The UTC time as a Unix timestamp
 * @returns {string} The hour in 12-hour format
 */
export default function getHour(timeUTC: number): string {
    return new Date(timeUTC * 1000)
        .toLocaleString([], { hour: "numeric", hour12: true })
        .replace(/\s/g, "");
}
