export default function getMidnightTodayUTC(): Date {
    let midnightTodayUTC = new Date();
    midnightTodayUTC.setHours(0, 0, 0, 0);
    return midnightTodayUTC;
}
