import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/HolidayCalendar.tsx
var defaultOptions = {
  showUpcomingDays: 30
};
function calculateEaster(year) {
  const a2 = year % 19;
  const b = Math.floor(year / 100);
  const c2 = year % 100;
  const d2 = Math.floor(b / 4);
  const e2 = b % 4;
  const f3 = Math.floor((b + 8) / 25);
  const g2 = Math.floor((b - f3 + 1) / 3);
  const h2 = (19 * a2 + b - d2 - g2 + 15) % 30;
  const i2 = Math.floor(c2 / 4);
  const k2 = c2 % 4;
  const l2 = (32 + 2 * e2 + 2 * i2 - h2 - k2) % 7;
  const m2 = Math.floor((a2 + 11 * h2 + 22 * l2) / 451);
  const month = Math.floor((h2 + l2 - 7 * m2 + 114) / 31);
  const day = (h2 + l2 - 7 * m2 + 114) % 31 + 1;
  return new Date(year, month - 1, day);
}
function calculateAdvent(year, sundayNumber) {
  const christmas = new Date(year, 11, 25);
  const christmasDay = christmas.getDay();
  const daysToSunday = christmasDay === 0 ? 0 : christmasDay;
  const advent0Date = 25 - daysToSunday - 21;
  const advent0 = new Date(year, 11, advent0Date);
  if (advent0Date < 27) {
    advent0.setDate(advent0Date + 7);
  }
  const adventDate = new Date(advent0);
  adventDate.setDate(advent0.getDate() + sundayNumber * 7);
  return adventDate;
}
function calculateChristKing(year) {
  const advent1 = calculateAdvent(year, 0);
  const christKing = new Date(advent1);
  christKing.setDate(advent1.getDate() - 7);
  return christKing;
}
function getNthWeekdayOfMonth(year, month, weekday, n2) {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const daysUntilWeekday = (weekday - firstWeekday + 7) % 7;
  const targetDate = 1 + daysUntilWeekday + (n2 - 1) * 7;
  return new Date(year, month, targetDate);
}
function getLastWeekdayOfMonth(year, month, weekday) {
  const lastDay = new Date(year, month + 1, 0);
  const lastDayWeekday = lastDay.getDay();
  const daysBack = (lastDayWeekday - weekday + 7) % 7;
  return new Date(year, month, lastDay.getDate() - daysBack);
}
function calculateMovingHolidays(year) {
  const holidays = /* @__PURE__ */ new Map();
  const easter = calculateEaster(year);
  holidays.set("easter", easter);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  holidays.set("good-friday", goodFriday);
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);
  holidays.set("ash-wednesday", ashWednesday);
  const shroveTuesday = new Date(easter);
  shroveTuesday.setDate(easter.getDate() - 47);
  holidays.set("shrove-tuesday", shroveTuesday);
  holidays.set("mardi-gras", shroveTuesday);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);
  holidays.set("pentecost", pentecost);
  const trinitySunday = new Date(easter);
  trinitySunday.setDate(easter.getDate() + 56);
  holidays.set("trinity-sunday", trinitySunday);
  const palmSunday = new Date(easter);
  palmSunday.setDate(easter.getDate() - 7);
  holidays.set("palm-sunday", palmSunday);
  holidays.set("advent1", calculateAdvent(year, 0));
  holidays.set("advent2", calculateAdvent(year, 1));
  holidays.set("advent3", calculateAdvent(year, 2));
  holidays.set("advent4", calculateAdvent(year, 3));
  holidays.set("christ-the-king", calculateChristKing(year));
  holidays.set("mlk-day", getNthWeekdayOfMonth(year, 0, 1, 3));
  holidays.set("presidents-day", getNthWeekdayOfMonth(year, 1, 1, 3));
  holidays.set("memorial-day", getLastWeekdayOfMonth(year, 4, 1));
  holidays.set("labor-day", getNthWeekdayOfMonth(year, 8, 1, 1));
  holidays.set("thanksgiving", getNthWeekdayOfMonth(year, 10, 4, 4));
  holidays.set("mothers-day", getNthWeekdayOfMonth(year, 4, 0, 2));
  holidays.set("fathers-day", getNthWeekdayOfMonth(year, 5, 0, 3));
  holidays.set("new-years-day", new Date(year, 0, 1));
  holidays.set("new-years-eve", new Date(year, 11, 31));
  holidays.set("valentines-day", new Date(year, 1, 14));
  holidays.set("st-patricks-day", new Date(year, 2, 17));
  holidays.set("independence-day", new Date(year, 6, 4));
  holidays.set("juneteenth", new Date(year, 5, 19));
  holidays.set("veterans-day", new Date(year, 10, 11));
  holidays.set("pearl-harbor-day", new Date(year, 11, 7));
  holidays.set("epiphany", new Date(year, 0, 6));
  holidays.set("halloween", new Date(year, 9, 31));
  holidays.set("all-saints-day", new Date(year, 10, 1));
  holidays.set("all-souls-day", new Date(year, 10, 2));
  holidays.set("christmas-eve", new Date(year, 11, 24));
  holidays.set("christmas", new Date(year, 11, 25));
  holidays.set("groundhog-day", new Date(year, 1, 2));
  holidays.set("cinco-de-mayo", new Date(year, 4, 5));
  holidays.set("earth-day", new Date(year, 3, 22));
  holidays.set("d-day", new Date(year, 5, 6));
  return holidays;
}
var HolidayCalendar_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const HolidayCalendar = (props) => {
    const { allFiles, fileData } = props;
    const buildYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [buildYear, buildYear + 1];
    const movingHolidaysByYear = /* @__PURE__ */ new Map();
    years.forEach((y2) => movingHolidaysByYear.set(y2, calculateMovingHolidays(y2)));
    const toDateKey = (d2) => `${String(d2.getMonth() + 1).padStart(2, "0")}/${String(d2.getDate()).padStart(2, "0")}`;
    const entryMap = /* @__PURE__ */ new Map();
    const getOrCreate = (dateKey, year, date) => {
      const key = `${dateKey}|${year}`;
      if (!entryMap.has(key)) {
        entryMap.set(key, {
          dateKey,
          isoDate: date.toISOString(),
          notes: [],
          holidayNames: []
        });
      }
      return entryMap.get(key);
    };
    years.forEach((year) => {
      const map = movingHolidaysByYear.get(year);
      map.forEach((date, name) => {
        const dk = toDateKey(date);
        const entry = getOrCreate(dk, year, date);
        if (!entry.holidayNames.includes(name)) entry.holidayNames.push(name);
      });
    });
    const holidayPattern = /^(\d{2})\/(\d{2})$/;
    allFiles.forEach((file) => {
      const holiday = file.frontmatter?.holiday;
      if (!holiday) return;
      const dates = Array.isArray(holiday) ? holiday : [holiday];
      dates.forEach((dateStr) => {
        const fixedMatch = String(dateStr).match(holidayPattern);
        if (fixedMatch) {
          const [, month, day] = fixedMatch;
          const dk = `${month}/${day}`;
          years.forEach((year) => {
            const date = new Date(year, Number(month) - 1, Number(day));
            const entry = getOrCreate(dk, year, date);
            entry.notes.push({
              slug: file.slug,
              title: String(file.frontmatter?.title ?? file.slug),
              href: resolveRelative(fileData.slug, file.slug)
            });
          });
        } else {
          const normalised = String(dateStr).toLowerCase();
          years.forEach((year) => {
            const map = movingHolidaysByYear.get(year);
            if (!map.has(normalised)) return;
            const date = map.get(normalised);
            const dk = toDateKey(date);
            const entry = getOrCreate(dk, year, date);
            const note = {
              slug: file.slug,
              title: String(file.frontmatter?.title ?? file.slug),
              href: resolveRelative(fileData.slug, file.slug)
            };
            if (!entry.notes.find((n2) => n2.slug === note.slug)) {
              entry.notes.push(note);
            }
          });
        }
      });
    });
    const serialized = Array.from(entryMap.values()).filter(
      (e2) => e2.notes.length > 0
    );
    if (serialized.length === 0) return null;
    const dataJson = JSON.stringify(serialized);
    const showDays = options.showUpcomingDays;
    return /* @__PURE__ */ u2(
      "div",
      {
        class: "holiday-calendar",
        "data-holiday-entries": dataJson,
        "data-show-upcoming-days": String(showDays),
        children: /* @__PURE__ */ u2("p", { class: "holiday-calendar-loading", children: "Loading calendar\u2026" })
      }
    );
  };
  HolidayCalendar.css = `
.holiday-calendar {
  margin: 1.5rem 0;
  padding: 1.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background: var(--light);
  max-height: 800px;
  overflow-y: auto;
}

.holiday-calendar-loading {
  color: var(--gray);
  font-style: italic;
}

.holiday-calendar-empty {
  color: var(--gray);
  font-style: italic;
}

.holiday-calendar-entry {
  margin-bottom: 0.25rem;
}

.holiday-calendar h4 {
  margin: 0 0 0.5rem 0;
}

.holiday-calendar h5 {
  margin: 0 0 0.25rem 0;
  color: var(--darkgray);
}

.holiday-calendar ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}
`;
  HolidayCalendar.afterDOMLoaded = `
    (function () {
      function formatHolidayName(name) {
        return name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      }

      function formatDate(dateStr) {
        // dateStr is an ISO string; parse as local date to avoid UTC-offset shift
        const [year, month, day] = dateStr.split("T")[0].split("-").map(Number)
        const d = new Date(year, month - 1, day)
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric" })
      }

      function renderNoteList(notes) {
        return "<ul>" +
          notes.map(n =>
            "<li><a href='" + n.href + "' class='internal'>" + n.title + "</a></li>"
          ).join("") +
          "</ul>"
      }

      function render(container) {
        const raw = container.dataset.holidayEntries
        const showDays = parseInt(container.dataset.showUpcomingDays || "30", 10)
        if (!raw) return

        const entries = JSON.parse(raw)   // SerializedHolidayEntry[]

        const today = new Date()
        // Strip time component so day-diff maths works cleanly
        today.setHours(0, 0, 0, 0)

        // Build a map: isoDate-prefix (YYYY-MM-DD) \u2192 entry
        const byDate = new Map()
        entries.forEach(entry => {
          const prefix = entry.isoDate.split("T")[0]
          byDate.set(prefix, entry)
        })

        // Find today's entry and upcoming entries
        const pad = n => String(n).padStart(2, "0")
        const todayPrefix = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate())

        const todayEntry = byDate.get(todayPrefix) || null
        const upcoming = []

        for (let i = 1; i <= showDays; i++) {
          const future = new Date(today)
          future.setDate(today.getDate() + i)
          const prefix = future.getFullYear() + "-" + pad(future.getMonth() + 1) + "-" + pad(future.getDate())
          if (byDate.has(prefix)) {
            upcoming.push(byDate.get(prefix))
          }
        }

        let html = ""

        if (todayEntry) {
          const names = todayEntry.holidayNames.map(formatHolidayName).join(", ")
          html += "<div class='holiday-calendar-entry'>"
          html += "<h4>"
          html += formatDate(todayEntry.isoDate)
          if (names) html += " <span>- " + names + "</span>"
          html += "</h4>"
          html += renderNoteList(todayEntry.notes)
          html += "</div>"
        }

        upcoming.forEach(entry => {
          const names = entry.holidayNames.map(formatHolidayName).join(", ")
          html += "<div class='holiday-calendar-entry'>"
          html += "<h5>"
          html += formatDate(entry.isoDate)
          if (names) html += " <span>- " + names + "</span>"
          html += "</h5>"
          html += renderNoteList(entry.notes)
          html += "</div>"
        })

        if (!todayEntry && upcoming.length === 0) {
          html = "<p class='holiday-calendar-empty'>No holidays in the next " + showDays + " days</p>"
        }

        container.innerHTML = html
      }

      function renderAll() {
        document.querySelectorAll(".holiday-calendar[data-holiday-entries]").forEach(render)
      }

      renderAll()
      window.addCleanup(() => {
        document.addEventListener("nav", renderAll)
      })
    })()
  `;
  return HolidayCalendar;
});

export { HolidayCalendar_default as HolidayCalendar };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map