// Global variables
let currentTimeZoneIndex = 0;
const timeZones = [
    { name: 'New York', offset: -5, dstStart: '03-14', dstEnd: '11-07', id: 'newYork' }, // DST: from 2nd Sunday March to 1st Sunday November
    { name: 'London', offset: 0, dstStart: '03-29', dstEnd: '10-25', id: 'london' }, // UK
    { name: 'Tokyo', offset: 9, dstStart: '', dstEnd: '', id: 'tokyo' }, // Japan has no DST
    { name: 'Sydney', offset: 10, dstStart: '10-01', dstEnd: '04-01', id: 'sydney' }, // Australia
    { name: 'Malta', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'malta' },
    { name: 'Ukraine', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'ukraine' },
    { name: 'Alaska', offset: -9, dstStart: '03-14', dstEnd: '11-07', id: 'alaska' },
    { name: 'France', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'france' },
    { name: 'Spain', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'spain' },
    { name: 'Poland', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'poland' },
];

let is24HourFormat = false; // Track the time format (24-hour/12-hour)

function isDST(date, start, end) {
    // Ensure that the start and end dates are valid
    if (!start || !end) return false;
    
    const year = date.getFullYear();
    const startDate = new Date(year, parseInt(start.split('-')[0]) - 1, 1); // Month is 0-indexed
    const endDate = new Date(year, parseInt(end.split('-')[0]) - 1, 1);
    
    startDate.setDate(getNthWeekday(1, 0, startDate.getMonth(), year)); // Nth week Sunday of March
    endDate.setDate(getNthWeekday(1, 0, endDate.getMonth(), year)); // Nth week Sunday of October

    return date >= startDate && date < endDate;
}

function getNthWeekday(nth, weekday, month, year) {
    const date = new Date(year, month, 1);
    let count = 0;

    while (date.getMonth() === month) {
        if (date.getDay() === weekday) {
            count++;
            if (count === nth) {
                return date.getDate();
            }
        }
        date.setDate(date.getDate() + 1);
    }
    return null; // Not found
}

function getOffset(timeZone) {
    const currentDate = new Date();
    let offset = timeZone.offset;

    // Check if DST is active
    if (isDST(currentDate, timeZone.dstStart, timeZone.dstEnd)) {
        offset += 1; // Add 1 hour for DST
    }

    return offset;
}

function getTime(offset) {
    const date = new Date(new Date().getTime() + offset * 60 * 60 * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    if (!is24HourFormat) {
        const isPM = hours >= 12;
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes}:${seconds} ${isPM ? 'PM' : 'AM'}`;
    } else {
        hours = hours.toString().padStart(2, '0'); // 24-hour format
        return `${hours}:${minutes}:${seconds}`;
    }
}

function updateClocks() {
    const currentZone = timeZones[currentTimeZoneIndex];
    document.getElementById("cityName").innerText = currentZone.name;
    document.getElementById("timeDisplay").innerText = getTime(getOffset(currentZone));

    setTimeout(updateClocks, 1000); // Update every second
}



function previousTimeZone() {
    currentTimeZoneIndex = (currentTimeZoneIndex - 1 + timeZones.length) % timeZones.length;
    updateClocks();
}

function nextTimeZone() {
    currentTimeZoneIndex = (currentTimeZoneIndex + 1) % timeZones.length;
    updateClocks();
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat; // Toggle format
    document.getElementById('toggle24Hour').innerText = is24HourFormat ? 'Switch to 12-Hour Format' : 'Switch to 24-Hour Format';
}

// Start the clock on page load
document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
});