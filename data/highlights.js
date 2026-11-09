/*
 * Highlights shown below the calendar.
 *
 * Each entry:
 *   date     "YYYY-MM-DD"   (required) first day of the event
 *   endDate  "YYYY-MM-DD"   (optional) last day, for multi-day events
 *   name     "Event name"   (required)
 *   city     "City"         (optional)
 *   note     "Short note"   (optional, shown on quarter cards only)
 *   tag      "quarter" -> "Coming up this quarter" cards
 *            "year"    -> "Save the dates" list
 *
 * Order doesn't matter; entries are sorted by date and past events are
 * hidden automatically.
 *
 * !!! Everything below is PLACEHOLDER data. Replace it with real events. !!!
 */
window.HIGHLIGHTS = [
  // ---- Coming up this quarter (PLACEHOLDERS) ----
  {
    date: "2026-11-21",
    name: "[PLACEHOLDER] Saturday Night Social",
    city: "Los Angeles",
    note: "Placeholder entry. Replace with a real event.",
    tag: "quarter"
  },
  {
    date: "2026-12-12",
    name: "[PLACEHOLDER] Holiday Workshop + Social",
    city: "San Diego",
    note: "Placeholder entry. Replace with a real event.",
    tag: "quarter"
  },

  // ---- Save the dates (PLACEHOLDERS) ----
  {
    date: "2027-02-12",
    endDate: "2027-02-15",
    name: "[PLACEHOLDER] Winter Convention",
    city: "Orange County",
    tag: "year"
  },
  {
    date: "2027-06-04",
    endDate: "2027-06-06",
    name: "[PLACEHOLDER] Summer Weekend Event",
    city: "Palm Springs",
    tag: "year"
  }
];
