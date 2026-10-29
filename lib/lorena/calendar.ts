import type { Edition, EditionSlug } from "./editions";

/** "Salvar na agenda" — Google Calendar link and an .ics file (iPhone, Outlook…). */

const TZ = "America/Sao_Paulo";
const TITLE = "Brunch de Fraldas da Lorena";

/** "2026-11-14" + "11:00" → "20261114T110000" (local time, zone given separately) */
const stamp = (date: string, time: string) => `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;

const location = (e: Edition) => [e.venue, e.mapQuery].filter(Boolean).join(" · ");
const details = (e: Edition) => `${TITLE} — ${e.city}, ${e.time}.\nLista de presentes: https://convitelorena.vercel.app/lista-de-presentes`;

export function googleCalendarUrl(e: Edition) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${TITLE} · ${e.city}`,
    dates: `${stamp(e.date, e.start)}/${stamp(e.date, e.end)}`,
    ctz: TZ,
    details: details(e),
    location: location(e),
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

/** Path served on the invitation host (rewritten to /lorena/<slug>/agenda). */
export const icsPath = (slug: EditionSlug) => `/${slug}/agenda`;

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export function icsFile(slug: EditionSlug, e: Edition) {
  // Brasília has no daylight saving time since 2019: a fixed -03:00 zone is exact
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Convite Lorena//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${TZ}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0300",
    "TZOFFSETTO:-0300",
    "TZNAME:-03",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:brunch-lorena-${slug}@convitelorena.vercel.app`,
    "DTSTAMP:20261029T000000Z",
    `DTSTART;TZID=${TZ}:${stamp(e.date, e.start)}`,
    `DTEND;TZID=${TZ}:${stamp(e.date, e.end)}`,
    `SUMMARY:${esc(`${TITLE} · ${e.city}`)}`,
    `LOCATION:${esc(location(e))}`,
    `DESCRIPTION:${esc(details(e))}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(`Amanhã: ${TITLE}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
