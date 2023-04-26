export function convertUNIXTimestampToLocaleDate(
  unixTimestamp: number,
  iso = "en-US"
): string {
  const date = new Date(unixTimestamp * 1000);
  const formattedDate = new Intl.DateTimeFormat(iso, {
    dateStyle: "full",
    timeStyle: undefined,
    timeZone: "UTC",
  }).format(date);
  return formattedDate;
}
