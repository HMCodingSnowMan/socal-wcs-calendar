(function () {
  "use strict";

  // ---- Google Calendar embed --------------------------------------------

  var CALENDAR_BASE =
    "https://calendar.google.com/calendar/embed" +
    "?src=9132e0850ab892ff06a655c08f1d0099baaf05ec1ed99163a699ecba077c1bea%40group.calendar.google.com" +
    "&ctz=America%2FLos_Angeles" +
    "&showPrint=0&showCalendars=0&showTabs=0";

  // Under 640px the month grid is unreadable, so use agenda mode.
  var phoneQuery = window.matchMedia("(max-width: 639px)");

  function calendarUrl() {
    return phoneQuery.matches ? CALENDAR_BASE + "&mode=AGENDA" : CALENDAR_BASE;
  }

  function renderCalendar() {
    var frame = document.getElementById("calendar-frame");
    if (!frame) return;

    var iframe = frame.querySelector("iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.title = "SoCal WCS Calendar";
      frame.appendChild(iframe);
    }

    var url = calendarUrl();
    if (iframe.getAttribute("src") !== url) iframe.setAttribute("src", url);
  }

  // Swap modes when crossing the breakpoint (rotation, window resize).
  if (phoneQuery.addEventListener) {
    phoneQuery.addEventListener("change", renderCalendar);
  } else if (phoneQuery.addListener) {
    phoneQuery.addListener(renderCalendar);
  }

  // ---- Highlights --------------------------------------------------------

  // Dates are "YYYY-MM-DD". Parse as a local calendar date (no time zone shift).
  function parseDate(value) {
    var parts = String(value).split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function formatDate(entry, options) {
    var start = parseDate(entry.date);
    var text = start.toLocaleDateString("en-US", options);
    if (entry.endDate) {
      var end = parseDate(entry.endDate);
      text += " – " + end.toLocaleDateString("en-US", options);
    }
    return text;
  }

  function startOfToday() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // Entries for a tag, upcoming only (past events drop off automatically),
  // sorted soonest first.
  function entriesFor(tag) {
    var all = Array.isArray(window.HIGHLIGHTS) ? window.HIGHLIGHTS : [];
    var today = startOfToday();
    return all
      .filter(function (e) {
        if (!e || e.tag !== tag || !e.date) return false;
        var last = parseDate(e.endDate || e.date);
        return last >= today;
      })
      .sort(function (a, b) {
        return parseDate(a.date) - parseDate(b.date);
      });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderQuarter() {
    var container = document.getElementById("quarter-list");
    if (!container) return;
    var items = entriesFor("quarter");
    container.textContent = "";

    if (!items.length) {
      container.appendChild(el("p", "empty", "Nothing announced yet. Check back soon."));
      return;
    }

    items.forEach(function (e) {
      var card = el("article", "card");
      card.appendChild(
        el("span", "card-date", formatDate(e, { weekday: "short", month: "short", day: "numeric" }))
      );
      card.appendChild(el("h3", "card-name", e.name));
      if (e.city) card.appendChild(el("p", "card-city", e.city));
      if (e.note) card.appendChild(el("p", "card-note", e.note));
      container.appendChild(card);
    });
  }

  function renderYear() {
    var list = document.getElementById("year-list");
    if (!list) return;
    var items = entriesFor("year");
    list.textContent = "";

    if (!items.length) {
      list.appendChild(el("li", "empty", "No dates saved yet."));
      return;
    }

    items.forEach(function (e) {
      var li = el("li");
      li.appendChild(el("span", "list-date", formatDate(e, { month: "short", day: "numeric" })));
      var info = el("span");
      info.appendChild(el("strong", null, e.name));
      if (e.city) info.appendChild(el("span", "list-city", e.city));
      li.appendChild(info);
      list.appendChild(li);
    });
  }

  renderCalendar();
  renderQuarter();
  renderYear();
})();
