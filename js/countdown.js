/* =========================================================
   EDITABLE SETTINGS — COUNTDOWN
   Birthday date is interpreted in Asia/Kolkata, not visitor time.
   ========================================================= */
const COUNTDOWN_SETTINGS = {
  birthdayMonth: 11, // November
  birthdayDay: 20,
  timeZone: "Asia/Kolkata"
};

function getIndiaDateParts() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: COUNTDOWN_SETTINGS.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());
  return Object.fromEntries(parts.map(part => [part.type, part.value]));
}
function indiaTimestamp(year, month, day) {
  // India is UTC+05:30. Constructing from UTC avoids visitor timezone drift.
  return Date.UTC(year, month - 1, day, -5, -30, 0);
}
function getBirthdayState() {
  const p = getIndiaDateParts();
  const year = Number(p.year), month = Number(p.month), day = Number(p.day);
  const birthdayToday = month === COUNTDOWN_SETTINGS.birthdayMonth && day === COUNTDOWN_SETTINGS.birthdayDay;
  const nextYear = month > COUNTDOWN_SETTINGS.birthdayMonth ||
    (month === COUNTDOWN_SETTINGS.birthdayMonth && day > COUNTDOWN_SETTINGS.birthdayDay)
    ? year + 1 : year;
  return {
    birthdayToday,
    target: indiaTimestamp(nextYear, COUNTDOWN_SETTINGS.birthdayMonth, COUNTDOWN_SETTINGS.birthdayDay),
    year, month, day
  };
}
function updateCountdown() {
  const state = getBirthdayState();
  const banner = document.getElementById("birthday-banner");
  const ids = ["days", "hours", "minutes", "seconds"];
  if (state.birthdayToday) {
    ids.forEach(id => document.getElementById(id).textContent = "00");
    document.getElementById("tower-label").textContent = "THE DIVINE EVENT IS HERE";
    document.getElementById("tower-caption").textContent = "Her day has finally arrived.";
    document.getElementById("town-status").textContent = "THE DIVINE EVENT HAS ARRIVED. The whole town is celebrating!";
    banner.hidden = false;
    document.body.classList.add("birthday-mode");
    return;
  }
  banner.hidden = true;
  document.body.classList.remove("birthday-mode");
  document.getElementById("tower-label").textContent = "THE DIVINE EVENT BEGINS IN";
  document.getElementById("tower-caption").textContent = "All preparations must be completed before Her arrival.";
  const diff = Math.max(0, state.target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  [days, hours, minutes, seconds].forEach((n, i) => {
    document.getElementById(ids[i]).textContent = String(n).padStart(2, "0");
  });
  const line = days < 2 ? "The residents have become rather excited." :
    days < 7 ? "The entire town is working at a most impressive pace." :
    "The residents are making excellent progress.";
  document.getElementById("town-status").textContent = line;
}
updateCountdown();
setInterval(updateCountdown, 1000);
