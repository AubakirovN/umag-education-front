import { format, parseISO } from "date-fns";

export const formatBirthday = (date: string) => {
  return format(new Date(date), "d.MM.yyyy HH:mm");
};
export const formatDMY = (date: string | Date) => {
  if (typeof date === "string") {
    return format(new Date(date), "d.MM.yyyy");
  } else {
    return format(date, "d.MM.yyyy");
  }
};
export const formatYMD = (date: Date | string) => {
  if (typeof date === "string") {
    return format(new Date(date), "yyyy-MM-dd");
  } else {
    return format(date, "yyyy-MM-dd");
  }
};
export const formatYMDHM = (date: string) => {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
};
export const getMonthAndYear = (date: string) => {
  const parsedDate = parseISO(date);

  const month = format(parsedDate, "MM");
  const year = format(parsedDate, "yyyy");

  return {
    month,
    year,
  };
};
export const getYear = (date: string) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, "yyyy");
};
export const formatDateTimeHM = (dateTime: string | Date) => {
  const dateTimeObj = new Date(dateTime);
  return format(dateTimeObj, 'HH:mm');
};