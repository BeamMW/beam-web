export function extractOriginsFromEnum(enumObj: object): string[] {
    return Object.values(enumObj).map((url) => {
      const urlObject = new URL(url);
      return urlObject.origin;
    });
}