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
  { name: 'Bahrain', offset: 3, dstStart: '', dstEnd: '', id: 'bahrain' },
  { name: 'Dubai', offset: 4, dstStart: '', dstEnd: '', id: 'dubai' },
  { name: 'Iraq', offset: 3, dstStart: '', dstEnd: '', id: 'iraq' },
  { name: 'Jordan', offset: 3, dstStart: '', dstEnd: '', id: 'jordan' },
  { name: 'Kuwait', offset: 3, dstStart: '', dstEnd: '', id: 'kuwait' },
  { name: 'Oman', offset: 4, dstStart: '', dstEnd: '', id: 'oman' },
  { name: 'Palestine', offset: 2, dstStart: '', dstEnd: '', id: 'palestine' },
  { name: 'Qatar', offset: 3, dstStart: '', dstEnd: '', id: 'qatar' },
  { name: 'Saudi Arabia', offset: 3, dstStart: '', dstEnd: '', id: 'saudiArabia' },
  { name: 'United Arab Emirates', offset: 4, dstStart: '', dstEnd: '', id: 'unitedArabEmirates' },
  { name: 'Yemen', offset: 3, dstStart: '', dstEnd: '', id: 'yemen' },
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
  { name: 'Peru', offset: -5, dstStart: '', dstEnd: '', id: 'peru' },
  { name: 'Brazil (São Paulo)', offset: -3, dstStart: '', dstEnd: '', id: 'brazil-sao-paulo' },
  { name: 'Los Angeles', offset: -8, dstStart: '03-14', dstEnd: '11-07', id: 'los-angeles' },
  { name: 'Russia', offset: 3, dstStart: '03-29', dstEnd: '10-25', id: 'russia' }, // Adjust as per specific region
  { name: 'Iran', offset: 3.5, dstStart: '03-21', dstEnd: '09-21', id: 'iran' }, // Note: Iran DST rules vary
  { name: 'Israel', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'israel' },
  { name: 'Lebanon', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'lebanon' },
  { name: 'Syria', offset: 2, dstStart: '03-29', dstEnd: '10-25', id: 'syria' },
  { name: 'Venezuela', offset: -4, dstStart: '', dstEnd: '', id: 'venezuela' },
  { name: 'Cuba', offset: -5, dstStart: '03-14', dstEnd: '11-07', id: 'cuba' },
];

let currentTimeZoneIndex = 0;
let is24HourFormat = false;

const timeZoneIds = {
  malta: 'Europe/Malta', london: 'Europe/London', sydney: 'Australia/Sydney',
  ukraine: 'Europe/Kyiv', alaska: 'America/Anchorage', france: 'Europe/Paris',
  spain: 'Europe/Madrid', poland: 'Europe/Warsaw', hungary: 'Europe/Budapest',
  northMacedonia: 'Europe/Skopje', czechia: 'Europe/Prague', cyprus: 'Asia/Nicosia',
  bahrain: 'Asia/Bahrain', dubai: 'Asia/Dubai', iraq: 'Asia/Baghdad',
  jordan: 'Asia/Amman', kuwait: 'Asia/Kuwait', oman: 'Asia/Muscat',
  palestine: 'Asia/Hebron', qatar: 'Asia/Qatar', saudiArabia: 'Asia/Riyadh',
  unitedArabEmirates: 'Asia/Dubai', yemen: 'Asia/Aden',
  vatican: 'Europe/Vatican', germany: 'Europe/Berlin',
  italy: 'Europe/Rome', greece: 'Europe/Athens', switzerland: 'Europe/Zurich',
  sweden: 'Europe/Stockholm', finland: 'Europe/Helsinki', denmark: 'Europe/Copenhagen',
  greenland: 'America/Nuuk', portugal: 'Europe/Lisbon', ireland: 'Europe/Dublin',
  iceland: 'Atlantic/Reykjavik', norway: 'Europe/Oslo', luxembourg: 'Europe/Luxembourg',
  'usa-east': 'America/New_York', 'canada-east': 'America/Toronto', china: 'Asia/Shanghai',
  tokyo: 'Asia/Tokyo', southKorea: 'Asia/Seoul', peru: 'America/Lima',
  'brazil-sao-paulo': 'America/Sao_Paulo', 'los-angeles': 'America/Los_Angeles',
  russia: 'Europe/Moscow', iran: 'Asia/Tehran', israel: 'Asia/Jerusalem',
  lebanon: 'Asia/Beirut', syria: 'Asia/Damascus', venezuela: 'America/Caracas',
  cuba: 'America/Havana'
};

function getUtcOffsetMinutes(date, timeZone) {
  const part = new Intl.DateTimeFormat('en', {
    timeZone,
    timeZoneName: 'longOffset'
  }).formatToParts(date).find((item) => item.type === 'timeZoneName').value;
  const match = part.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === '+' ? minutes : -minutes;
}

function getDaylightSavingStatus(date, timeZone) {
  const year = date.getUTCFullYear();
  const januaryOffset = getUtcOffsetMinutes(new Date(Date.UTC(year, 0, 1)), timeZone);
  const julyOffset = getUtcOffsetMinutes(new Date(Date.UTC(year, 6, 1)), timeZone);

  if (januaryOffset === julyOffset) return 'This location does not observe daylight saving time';

  const currentOffset = getUtcOffsetMinutes(date, timeZone);
  return currentOffset > Math.min(januaryOffset, julyOffset)
    ? 'Daylight saving time is in effect'
    : 'Standard time (daylight saving time is off)';
}

function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24HourFormat
  }).format(date);
}

// Main update function
function updateDisplay() {
  const zone = timeZones[currentTimeZoneIndex];
  const timeZone = timeZoneIds[zone.id];
  const now = new Date();
  document.getElementById('cityName').innerText = zone.name;
  document.getElementById('time').innerText = formatTime(now, timeZone);
  document.getElementById('localTime').innerText = formatTime(now);
  document.getElementById('dstStatus').innerText = getDaylightSavingStatus(now, timeZone);
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
  updateDisplay();
}

// Exit button handler
function exitPage() {
  // Optional: you can add custom logic here, or leave it empty
  // For now, it just navigates to the linked page
}
 
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const options = document.getElementById('timeZoneOptions');
  const search = document.getElementById('zoneSearch');

  timeZones.forEach((zone) => {
    const option = document.createElement('option');
    option.value = zone.name;
    options.appendChild(option);
  });

  const selectTimeZone = () => {
    const query = search.value.trim().toLowerCase();
    const matchIndex = timeZones.findIndex(
      (zone) => zone.name.toLowerCase() === query
    );
    if (matchIndex !== -1) {
      currentTimeZoneIndex = matchIndex;
      updateDisplay();
    }
  };

  search.addEventListener('change', selectTimeZone);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      selectTimeZone();
      search.blur();
    }
  });

  updateDisplay();
  window.setInterval(updateDisplay, 1000);
});