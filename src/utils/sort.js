export const Sort = (a, b, order = "ASC") => {
  if (a > b) return order === "ASC" ? 1 : -1;
  if (a < b) return order === "ASC" ? -1 : 1;
  return 0;
};
