import { format } from "date-fns";

export const formattedDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDateTime = format(date, "dd/MM/yyyy HH:mm");

  return formattedDateTime;
};
