export const initials = (str: string) =>
  str
    .split(" ")
    .map((s) => s[0])
    .join("");
