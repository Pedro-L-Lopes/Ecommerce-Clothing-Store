import { format } from "date-fns";

export const formattedDate = (dateString) => {
  const timestamp = Date.parse(dateString);

  if (isNaN(timestamp)) {
    return "Data inválida";
  }

  const date = new Date(timestamp);
  const formattedDateTime = format(date, "dd/MM/yyyy HH:mm");

  return formattedDateTime;
};
