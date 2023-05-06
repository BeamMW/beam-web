import { formatDistanceToNowStrict } from "date-fns";

export function formatTimeRelative(
  seconds: number,
  formatLocale: Locale
): string {
  const now = new Date();
  const targetDate = new Date(now.getTime() + seconds * 1000);

  const formattedTime = formatDistanceToNowStrict(targetDate, {
    locale: formatLocale,
    addSuffix: true,
  });

  return formattedTime;
}
