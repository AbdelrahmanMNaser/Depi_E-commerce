const timeZoneToCountry = {
  // Africa
  "Africa/Algiers": "Algeria",
  "Africa/Cairo": "Egypt",
  "Africa/Casablanca": "Morocco",
  "Africa/Johannesburg": "South Africa",
  "Africa/Lagos": "Nigeria",
  "Africa/Nairobi": "Kenya",
  "Africa/Tripoli": "Libya",
  "Africa/Tunis": "Tunisia",
  // America
  "America/Anchorage": "United States",
  "America/Buenos_Aires": "Argentina",
  "America/Chicago": "United States",
  "America/Los_Angeles": "United States",
  "America/Mexico_City": "Mexico",
  "America/New_York": "United States",
  "America/Quito": "Ecuador",
  "America/Santiago": "Chile",
  "America/Sao_Paulo": "Brazil",
  "America/Tegucigalpa": "Honduras",
  "America/Toronto": "Canada",
  "Antarctica/Palmer": "Antarctica",
  // Asia
  "Asia/Baghdad": "Iraq",
  "Asia/Beirut": "Lebanon",
  "Asia/Dubai": "United Arab Emirates",
  "Asia/Doha": "Qatar",
  "Asia/Hong_Kong": "Hong Kong",
  "Asia/Istanbul": "Turkey",
  "Asia/Kolkata": "India",
  "Asia/Manila": "Philippines",
  "Asia/New_Delhi": "India",
  "Asia/Riyadh": "Saudi Arabia",
  "Asia/Seoul": "South Korea",
  "Asia/Shanghai": "China",
  "Asia/Singapore": "Singapore",
  "Asia/Tokyo": "Japan",
  "Asia/Yakutsk": "Russia",
  "Asia/Yekaterinburg": "Russia",
  // Australia
  "Australia/Adelaide": "Australia",
  "Australia/Brisbane": "Australia",
  "Australia/Canberra": "Australia",
  "Australia/Hobart": "Australia",
  "Australia/Melbourne": "Australia",
  "Australia/Perth": "Australia",
  "Australia/Sydney": "Australia",
  // Europe
  "Europe/Amsterdam": "Netherlands",
  "Europe/Athens": "Greece",
  "Europe/Berlin": "Germany",
  "Europe/Bucharest": "Romania",
  "Europe/Budapest": "Hungary",
  "Europe/Copenhagen": "Denmark",
  "Europe/Dublin": "Ireland",
  "Europe/Helsinki": "Finland",
  "Europe/Istanbul": "Turkey",
  "Europe/Kiev": "Ukraine",
  "Europe/Lisbon": "Portugal",
  "Europe/London": "United Kingdom",
  "Europe/Madrid": "Spain",
  "Europe/Moscow": "Russia",
  "Europe/Paris": "France",
  "Europe/Rome": "Italy",
  "Europe/Warsaw": "Poland",
  "Europe/Zurich": "Switzerland",
  // Pacific
  "Pacific/Auckland": "New Zealand",
};


function timezoneToCountry(timezone) {
  return timeZoneToCountry[timezone];
}

module.exports = timezoneToCountry;