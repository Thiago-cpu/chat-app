export const initials = (str: string) =>
  str
    .split(" ")
    .map((s) => s[0])
    .filter((s) => s != "-")
    .join("");
