export const formatDateForChat = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  // @ts-ignore
  return date.toLocaleString("en-US", options);
};
