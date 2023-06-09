function dedupeArray<T>(inputArray: T[]): T[] {
  return Array.from(new Set(inputArray));
}

export function extractOriginsFromEnum(enumObj: object): string[] {
  const origins = Object.values(enumObj)
    .map((url: string) => {
      const urlObject = new URL(url);
      if (urlObject.origin && urlObject.origin !== "null") {
        return urlObject.origin;
      }
      return undefined; // Explicitly return undefined if the condition is not met
    })
    .filter((origin) => origin !== undefined);

  return dedupeArray(origins) as string[];
}
