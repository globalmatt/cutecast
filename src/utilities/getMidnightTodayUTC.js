export default function getMidnightTodayUTC() {
    let midnightTodayUTC = new Date();
    midnightTodayUTC.setHours(0, 0, 0, 0);
    return midnightTodayUTC;
}
