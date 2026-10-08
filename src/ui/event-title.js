// Feed titles stay in the source language for matching; only their display is localized.
const PREFIXES = [
  [/^Tropical Cyclone\s+/i, 'Bão '],
  [/^Tropical Storm\s+/i, 'Bão nhiệt đới '],
  [/^Typhoon\s+/i, 'Bão '],
  [/^Hurricane\s+/i, 'Bão '],
  [/^Earthquake\s+/i, 'Động đất '],
  [/^Flood\s+/i, 'Lũ lụt '],
  [/^Forest fire\s+/i, 'Cháy rừng '],
  [/^Wildfire\s+/i, 'Cháy rừng '],
  [/^Volcano\s+/i, 'Núi lửa '],
];

/** Translate well-known English event-type prefixes for display. */
export function displayEventTitle(title) {
  const value = String(title || '');
  const match = PREFIXES.find(([pattern]) => pattern.test(value));
  return match ? value.replace(match[0], match[1]) : value;
}
