/* =========================================================
   EDITABLE CONTENT — PERSONAL DETAILS
   Replace the sample text below with your own words.
   ========================================================= */
const PERSONAL_CONTENT = {
  recipientName: "The goddss",
  introduction: `Basically for inspo i was looking thro my poems and i realised i use "goddess" metaphor quite often

So i tried creating a sort of world where you are their god

Now ik it didnt turn out too good cause drawing with code is hard but yea it is what it is.`,
  birthdayMessage: "May your day be full of little joys, warm surprises, and all the lovely things you deserve."
};

document.title = `The Divine Event — ${PERSONAL_CONTENT.recipientName}`;
document.getElementById("intro-message").textContent = PERSONAL_CONTENT.introduction;
document.getElementById("birthday-message").textContent = PERSONAL_CONTENT.birthdayMessage;

const pages = ["intro", "town", "tavern"];
const navButtons = [...document.querySelectorAll("[data-go]")];
function showPage(pageId) {
  if (!pages.includes(pageId)) return;
  document.querySelectorAll(".page").forEach(page => {
    const active = page.id === pageId;
    page.classList.toggle("active", active);
    page.setAttribute("aria-hidden", String(!active));
  });
  document.querySelectorAll(".nav-link").forEach(button => {
    const active = button.dataset.go === pageId;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  history.replaceState(null, "", `#${pageId}`);
  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
navButtons.forEach(button => button.addEventListener("click", () => showPage(button.dataset.go)));
const initialPage = location.hash.slice(1);
showPage(pages.includes(initialPage) ? initialPage : "intro");

const grid = document.getElementById("character-grid");
const backdrop = document.getElementById("dialogue-backdrop");
let currentResident = null, quoteIndex = 0;
function residentMarkup(person) {
  return `<button class="resident" type="button" data-resident="${person.id}" aria-label="Speak to ${person.name}, ${person.role}">
    <span class="person ${person.id}" aria-hidden="true">
      <i class="hair"></i><i class="head"></i><i class="eyes"></i><i class="smile"></i>
      <i class="arm left"></i><i class="arm right"></i><i class="body"></i><i class="feet"></i>
    </span>
    <span class="resident-name">${person.name}</span><span class="resident-role">${person.role}</span>
  </button>`;
}
grid.innerHTML = RESIDENTS.map(residentMarkup).join("");
const byId = id => RESIDENTS.find(person => person.id === id);
function openResident(person) {
  currentResident = person;
  quoteIndex = Math.floor(Math.random() * person.quotes.length);
  document.getElementById("dialogue-portrait").textContent = person.symbol;
  document.getElementById("dialogue-role").textContent = person.role;
  document.getElementById("dialogue-name").textContent = person.name;
  document.getElementById("dialogue-quote").textContent = person.quotes[quoteIndex];
  backdrop.hidden = false;
  document.getElementById("dialogue-close").focus();
}
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-resident]");
  if (button) openResident(byId(button.dataset.resident));
});
document.getElementById("next-quote").addEventListener("click", () => {
  if (!currentResident) return;
  quoteIndex = (quoteIndex + 1) % currentResident.quotes.length;
  document.getElementById("dialogue-quote").textContent = currentResident.quotes[quoteIndex];
});
function closeDialogue() { backdrop.hidden = true; currentResident = null; }
document.getElementById("dialogue-close").addEventListener("click", closeDialogue);
backdrop.addEventListener("click", event => { if (event.target === backdrop) closeDialogue(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !backdrop.hidden) closeDialogue(); });

/* Balloon frequency gently increases as November 20 approaches. */
const balloonLayer = document.getElementById("balloon-layer");
const balloonColours = ["#a9574b", "#d0ac65", "#788fa1", "#c98782"];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function daysUntilBirthday() {
  const parts = new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(x=>[x.type,x.value]));
  const y=+p.year,m=+p.month,d=+p.day;
  if(m===11&&d===20)return 0;
  const targetYear=(m>11||(m===11&&d>20))?y+1:y;
  const target=Date.UTC(targetYear,10,20,-5,-30,0);
  return Math.max(0,Math.ceil((target-Date.now())/86400000));
}
function spawnBalloon() {
  if (reduceMotion || !balloonLayer || !document.getElementById("town").classList.contains("active")) return;
  const balloon = document.createElement("span");
  balloon.className = "balloon";
  const colour = balloonColours[Math.floor(Math.random()*balloonColours.length)];
  const duration = 12 + Math.random()*9;
  balloon.style.left = `${5 + Math.random()*90}%`;
  balloon.style.background = colour;
  balloon.style.color = colour;
  balloon.style.setProperty("--duration", `${duration}s`);
  balloon.style.setProperty("--drift", `${-35 + Math.random()*70}px`);
  const scale = .75 + Math.random()*.65;
  balloon.style.transform = `scale(${scale})`;
  balloonLayer.appendChild(balloon);
  setTimeout(() => balloon.remove(), duration*1000 + 100);
}
function balloonLoop() {
  const days = daysUntilBirthday();
  const interval = days <= 1 ? 3300 : days <= 3 ? 4800 : days <= 7 ? 6500 : 9000;
  spawnBalloon();
  setTimeout(balloonLoop, interval + Math.random()*2500);
}
if (!reduceMotion) setTimeout(balloonLoop, 1700);
if (daysUntilBirthday() === 0) document.body.classList.add("birthday-mode");
