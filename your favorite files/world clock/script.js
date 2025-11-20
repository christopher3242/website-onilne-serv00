const timeZones = [
  { name: 'Malta', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'malta' },
  { name: 'London', offset: 0, dstStart: '03-29', dstEnd: '10-25', id: 'london' }, 
  { name: 'Sydney', offset: 10, dstStart: '10-01', dstEnd: '04-01', id: 'sydney' },
  { name: 'Ukraine', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'ukraine' },
  { name: 'Alaska', offset: -9, dstStart: '03-14', dstEnd: '11-07', id: 'alaska' },
  { name: 'France', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'france' },
  { name: 'Spain', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'spain' },
  { name: 'Poland', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'poland' },
  { name: 'Hungary', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'hungary' },
  { name: 'North Macedonia', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'northMacedonia' },
  { name: 'Czechia', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'czechia' },
  { name: 'Cyprus', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'cyprus' },
  { name: 'Vatican City (Holy See)', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'vatican' },
  { name: 'Germany', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'germany' },
  { name: 'Italy', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'italy' },
  { name: 'Greece', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'greece' },
  { name: 'Switzerland', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'switzerland' },
  { name: 'Sweden', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'sweden' },
  { name: 'Finland', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'finland' },
  { name: 'Denmark', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'denmark' },
  { name: 'Greenland', offset: -3, dstStart: '03-14', dstEnd: '11-07', id: 'greenland' },
  { name: 'Portugal', offset: 0, dstStart: '03-29', dstEnd: '10-25', id: 'portugal' },
  { name: 'Ireland', offset: 0, dstStart: '03-29', dstEnd: '10-25', id: 'ireland' },
  { name: 'Iceland', offset: 0, dstStart: '', dstEnd: '', id: 'iceland' },
  { name: 'Norway', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'norway' },
  { name: 'Luxembourg', offset: 1, dstStart: '03-29', dstEnd: '10-25', id: 'luxembourg' },
  { name: 'USA (Eastern)', offset: -5, dstStart: '03-14', dstEnd: '11-07', id: 'usa-east' },
  { name: 'Canada (Eastern)', offset: -5, dstStart: '03-14', dstEnd: '11-07', id: 'canada-east' },
  { name: 'China', offset: 8, dstStart: '', dstEnd: '', id: 'china' },
  { name: 'Tokyo', offset: 9, dstStart: '', dstEnd: '', id: 'tokyo' },
  { name: 'South Korea', offset: 9, dstStart: '', dstEnd: '', id: 'southKorea' },
];

let currentTimeZoneIndex = 0;
let is24HourFormat = false;

// Helper to determine if DST is active based on date
function isDST(date, dstStartStr, dstEndStr) {
  if (!dstStartStr || !dstEndStr) return false;
  const year = date.getFullYear();

  function getSecondSunday(year, month) {
    const firstDay = new Date(year, month, 1);
    let count = 0;
    const dateIter = new Date(firstDay);
    while (dateIter.getMonth() === month) {
      if (dateIter.getDay() === 0) { // Sunday
        count++;
        if (count === 2) return new Date(dateIter);
      }
      dateIter.setDate(dateIter.getDate() + 1);
    }
  }

  function getFirstSunday(year, month) {
    const firstDay = new Date(year, month, 1);
    const dateIter = new Date(firstDay);
    while (dateIter.getMonth() === month) {
      if (dateIter.getDay() === 0) return new Date(dateIter);
      dateIter.setDate(dateIter.getDate() + 1);
    }
  }

  const dstStartMonth = parseInt(dstStartStr.split('-')[0]) - 1;
  const dstStartDay = parseInt(dstStartStr.split('-')[1]);
  const dstEndMonth = parseInt(dstEndStr.split('-')[0]) - 1;
  const dstEndDay = parseInt(dstEndStr.split('-')[1]);

  const dstStartDate = getSecondSunday(year, dstStartMonth);
  const dstEndDate = getFirstSunday(year, dstEndMonth);

  // Normalize times to noon for consistency
  dstStartDate.setHours(12, 0, 0);
  dstEndDate.setHours(12, 0, 0);
  date.setHours(12, 0, 0);

  if (dstEndDate < dstStartDate) {
    // spans year end
    return date >= dstStartDate || date < dstEndDate;
  } else {
    return date >= dstStartDate && date < dstEndDate;
  }
}

// Calculate current offset considering DST
function getOffset(zone) {
  const now = new Date();
  let offset = zone.offset;
  if (isDST(now, zone.dstStart, zone.dstEnd)) {
    offset += 1;
  }
  return offset;
}

// Format time based on current format
function getTime(offset) {
  const date = new Date(new Date().getTime() + offset * 60 * 60 * 1000);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  if (!is24HourFormat) {
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${amPm}`;
  } else {
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  }
}

// Main update function
function updateDisplay() {
  const zone = timeZones[currentTimeZoneIndex];
  document.getElementById('cityName').innerText = zone.name;
  const offset = getOffset(zone);
  document.getElementById('time').innerText = getTime(offset);
  setTimeout(updateDisplay, 1000);
}

// Navigation functions
function previousTimeZone() {
  currentTimeZoneIndex = (currentTimeZoneIndex - 1 + timeZones.length) % timeZones.length;
  updateDisplay();
}
function nextTimeZone() {
  currentTimeZoneIndex = (currentTimeZoneIndex + 1) % timeZones.length;
  updateDisplay();
}

// Toggle time format
function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  document.getElementById('formatBtn').innerText = is24HourFormat ? 'Switch to 12-Hour' : 'Switch to 24-Hour';
}

// Exit button handler
function exitPage() {
  // Optional: you can add custom logic here, or leave it empty
  // For now, it just navigates to the linked page
}
 
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
});