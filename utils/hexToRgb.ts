export function hexToRgb(hex: string): [number, number, number] | null {
  const validHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (!validHex.test(hex)) {
    return null;
  }

  const hexValue = hex.slice(1);
  const normalizedHex =
    hexValue.length === 3
      ? hexValue
          .split("")
          .map((val) => val + val)
          .join("")
      : hexValue;

  const r = parseInt(normalizedHex.slice(0, 2), 16);
  const g = parseInt(normalizedHex.slice(2, 4), 16);
  const b = parseInt(normalizedHex.slice(4, 6), 16);

  return [r, g, b];
}
