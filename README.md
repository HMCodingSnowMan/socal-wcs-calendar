# SoCal WCS Calendar

A public calendar of weekly West Coast Swing classes and socials across
Southern California. It's built for phones, since most visitors arrive from an
Instagram bio link.

## How it works

It's a static site: plain HTML, CSS, and JavaScript, with no framework and no
build step.

| File                 | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `index.html`         | Page structure: header, buttons, calendar, highlights     |
| `styles.css`         | Mobile-first styles with automatic light/dark mode        |
| `script.js`          | Loads the calendar embed and renders the highlights       |
| `data/highlights.js` | Hand-edited list of upcoming highlights                   |

**Weekly events** come from a public Google Calendar embedded in an iframe.
Add or edit events in Google Calendar and the site picks them up. You don't
need to touch the code. On screens narrower than 640px the embed switches to
agenda mode, because the month grid is unreadable on a phone.

**Highlights** ("Coming up this quarter" and "Save the dates") come from
`data/highlights.js`.

## Updating highlights

Open `data/highlights.js` and edit the `window.HIGHLIGHTS` array. Each entry
looks like this:

```js
{
  date: "2027-02-12",        // required, YYYY-MM-DD
  endDate: "2027-02-15",     // optional, for multi-day events
  name: "Winter Convention", // required
  city: "Orange County",     // optional
  note: "Early bird ends Jan 1", // optional, shown on quarter cards only
  tag: "quarter"             // "quarter" or "year"
}
```

- `tag: "quarter"` shows the entry as a card under **Coming up this quarter**.
- `tag: "year"` shows the entry in the **Save the dates** list.
- Order doesn't matter. Entries are sorted by date.
- Events disappear on their own once their last day has passed, so old entries
  can stay in the file until you get around to cleaning up.
- Keep the commas between entries. A missing comma breaks the file, and both
  sections will show their "nothing yet" message.

Commit and push the change. Vercel redeploys automatically.

## Running locally

Open `index.html` in a browser. No server is needed.

## Deploying

The site is hosted on Vercel as a static project that deploys from the GitHub
repo's `main` branch. There's no build command, and the output directory is
the repo root.
