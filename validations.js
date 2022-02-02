export function existsStrWithLength(str) {
  return str && typeof str === "string" && !!str.length;
}

export function existsNumWithVal(num) {
  return num && typeof num === "number" && num > 0;
}
