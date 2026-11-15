# The Divine Event

A three-page, responsive birthday storybook website made with HTML, CSS, and vanilla JavaScript.

## Run locally

1. Extract the project folder.
2. Open `index.html` in a modern browser.

No build step, package installation, or local server is required. The Google Fonts import is optional; the page falls back to Georgia and system sans-serif fonts if offline.

## Pages

- **The Letter** — a parchment introduction with editable personal text.
- **The Town** — a CSS-built fantasy village, central countdown tower, clouds, and occasional floating balloons.
- **The Tavern** — seven clickable residents with individual dialogue and multiple compliment variations.

## Edit the personal text

Open `js/main.js` and edit the `PERSONAL_CONTENT` object near the top:

- `recipientName`
- `introduction`
- `birthdayMessage`

The introduction supports line breaks using template-string text. The birthday message appears in the town's birthday announcement.

## Edit characters and dialogue

Open `js/characters.js`. Each resident has:

- `name`
- `role`
- `symbol`
- `quotes` (an array; add or replace lines as desired)

The seventh resident is intentionally understated and is not identified as representing anyone.

## Change the birthday date or timezone

Open `js/countdown.js` and edit `COUNTDOWN_SETTINGS`. The current configuration is November 20 in `Asia/Kolkata`. The countdown and birthday mode use India time regardless of the visitor's local timezone. Birthday mode lasts for November 20 in India; from November 21 the countdown targets the next November 20.

## Replace the Shinchan cameo

Place your own image at:

`assets/images/shinchan.png`

A transparent PNG works best. If the file is absent, the page displays a tiny “psst.” Easter-egg fallback instead of a broken image icon. The image is intentionally not bundled.

## Structure

```text
index.html
css/
  style.css
  town.css
  tavern.css
js/
  main.js
  countdown.js
  characters.js
assets/
  images/
    (add shinchan.png here)
README.md
```

## Notes

- All three pages are navigable using the top navigation and previous/next controls.
- Character panels close with the close button, by clicking outside, or with Escape.
- Balloon animation is disabled when the visitor requests reduced motion.
- The town is built from CSS elements rather than a single background illustration.
- The layout adapts for narrow portrait screens.
