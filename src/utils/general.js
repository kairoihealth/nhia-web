export const isImage = (fileName) => {
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "svg", "tiff", "tif"];
  const nameSplit = fileName.split(".");
  const fileExtension = nameSplit[nameSplit.length - 1].toLowerCase();
  return imageExtensions.includes(fileExtension);
};

export const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (
    parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase() || ""
  );
};

export const shortenDay = (date) => {
  let day = new Date(date);
  return day.toLocaleDateString("en-US", { weekday: "short" });
};

export const truncateDay = (day) => {
  if (day?.length > 3) {
    return day?.slice(0, 3);
  }
  return day;
};
