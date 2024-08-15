export const camelToTitle = (camelCaseString) => {
  const spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2");
  const titleCaseString = spacedString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return titleCaseString;
};
