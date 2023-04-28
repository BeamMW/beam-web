export function convertUNIXTimestampToLocaleDate(
  unixTimestamp: number,
  iso = "en-US"
): string {
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat(iso, {
    dateStyle: "full",
    timeStyle: undefined,
    timeZone: "UTC",
  }).format(date);
}

export function localizePrice(
  price: number,
  iso = "en-US",
  fixed = 5,
  currency = "usd"
): string {
  if (!Intl.NumberFormat) {
    return `$${price.toFixed(fixed)}`;
  }
  return new Intl.NumberFormat(iso, {
    style: "currency",
    currency,
    maximumSignificantDigits: fixed,
  }).format(price);
}
