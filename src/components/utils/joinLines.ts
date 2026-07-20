export const joinLines = (
  input: string,
  separator: string = ","
): string => {
  return input
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .join(separator);
};