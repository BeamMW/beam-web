// EU detection for notices that only apply to visitors in the European Union.
// The site is statically generated, so there is no request-time geo header to
// read: detection happens on the client from the browser timezone and stays
// false during SSR/prerender. The browser language is deliberately not used as
// a fallback -- a bare "de"/"fr"/"es" maximizes to an EU region regardless of
// where the visitor actually is.
const EU_TIMEZONES = new Set([
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Busingen",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Helsinki",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Mariehamn",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Asia/Nicosia",
  "Europe/Zagreb",
  "Africa/Ceuta",
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Indian/Mayotte",
  "Indian/Reunion",
  "America/Cayenne",
  "America/Guadeloupe",
  "America/Martinique",
]);

export const useEuRegion = () => {
  const isEuRegion = ref(false);

  onMounted(() => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      isEuRegion.value = Boolean(timezone) && EU_TIMEZONES.has(timezone);
    } catch {
      isEuRegion.value = false;
    }
  });

  return { isEuRegion };
};
