export const getCurrentDateTime = (separator: string = " "): string => {
  const now: Date = new Date();

  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day: string = String(now.getDate()).padStart(2, "0");

  const hours: string = String(now.getHours()).padStart(2, "0");
  const minutes: string = String(now.getMinutes()).padStart(2, "0");
  const seconds: string = String(now.getSeconds()).padStart(2, "0");

  const date: string = `${year}-${month}-${day}`;
  const time: string = `${hours}:${minutes}:${seconds}`;

  return `${date}${separator}${time}`;
};
