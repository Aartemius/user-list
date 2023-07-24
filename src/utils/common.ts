import { Color } from "../types/user";

export const getUserColor = (color: Color): string => {
  switch (color) {
    case Color.RED:
      return 'red';
    case Color.GREEN:
      return 'green';
    case Color.BLUE:
      return 'blue';
    default:
      return 'black';
  }
};

export const getFormattedRaceTime = (milliseconds: number): string => {
  // Calculate minutes, seconds, and milliseconds
  let minutes: number = Math.floor(milliseconds / (1000 * 60));
  milliseconds %= 1000 * 60;
  let seconds: number = Math.floor(milliseconds / 1000);
  milliseconds %= 1000;

  // Add leading zeros if necessary
  const padWithZeros = (value: number, length: number) => value.toString().padStart(length, '0');
  const paddedMinutes = padWithZeros(minutes, 2);
  const paddedSeconds = padWithZeros(seconds, 2);
  const paddedMilliseconds = padWithZeros(milliseconds, 3);

  return `${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
}
