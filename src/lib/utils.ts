import { type ClassValue, clsx } from "clsx";
import { add, format, isValid } from "date-fns";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

// import { type ClassValue, clsx } from "clsx"
// import { format } from "date-fns";
// import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeSpace = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").trim();
};

export function formatDateTime(dateString?: string) {
  if (dateString === "" || !dateString) {
    return "";
  }
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy h:mma");
}

export function formatDate(dateString?: string) {
  if (dateString === "" || !dateString) {
    return "";
  }
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy");
}

export function formatTime(dateString?: string) {
  if (dateString === "" || !dateString) {
    return "";
  }
  const date = new Date(dateString);
  return format(date, "h:mma");
}

export function formatTime12Hour(timeString?: string) {
  // Converts Time Format "hh:mm:ss" or "hh:mm" to "hh:mm[AP]M"
  if (timeString === "" || !timeString) {
    return "";
  }
  const time = DateTime.fromISO(`${timeString}`);
  return time.toLocaleString(DateTime.TIME_SIMPLE);
}

export function formatDateForInput(date: Date) {
  if (!isValid(date)) {
    return "";
  }
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
    2,
    "0"
  )}-${`${date.getDate()}`.padStart(2, "0")}`;
}

export function formatDateTimeForInput(date: Date) {
  if (!isValid(date)) {
    return "";
  }
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
    2,
    "0"
  )}-${`${date.getDate()}`.padStart(2, "0")}T${`${date.getHours()}`.padStart(
    2,
    "0"
  )}:${`${date.getMinutes()}`.padStart(2, "0")}`;
}

export function formatDateTimeToTime(dateTimeString?: string) {
  //Extracts the time "hh:mm[AP]M" from the "dd/mm/yyyy hh:mm[AP]M" string format
  if (dateTimeString === "" || !dateTimeString) {
    return "";
  }
  const dateTimeArray = dateTimeString.split(" ");
  if (dateTimeArray.length > 1) {
    return dateTimeArray[1];
  }
  return "";
}

export function formatDateTimeToDate(dateTimeString?: string) {
  //Extracts the time "dd/mm/yyyy" from the "dd/mm/yyyy hh:mm[AP]M" string format
  if (!dateTimeString) {
    return "";
  }
  const dateTimeArray = dateTimeString.split(" ");
  return dateTimeArray[0];
}

export function dateAdd(date: Date, days: number) {
  // result.setDate(result.getDate() + days);
  const result = add(new Date(date), {
    days,
    seconds: 1,
  });

  return result;
}

export const formatCost = (cost: number) => {
  const costFormat = Intl.NumberFormat("en-US");
  return costFormat.format(cost);
};

export const getCurrentDateFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

export function getNowString() {
  const newDate = new Date();
  // const [edit, setEdit] = useState(diagnosis.diagnosisSeqno ? false : true);
  const now = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(
      2,
      "0"
    )}-${newDate.getDate().toString().padStart(2, "0")}T${newDate
    .getHours()
    .toString()
    .padStart(
      2,
      "0"
    )}:${newDate.getMinutes().toString().padStart(2, "0")}:${newDate
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  return now;
}

export function getDurationInDays(uom: string, duration: string) {
  switch (uom) {
    case "D":
      return duration ? Number(duration) : 0;
    case "W":
      return duration ? Number(duration) * 7 : 0;
    case "M":
      return duration ? Number(duration) * 30 : 0;
    default:
      return 0;
  }
}

export function formatDateTimeToISOFormat(dateTime: string) {
  // Parse the input string using Luxon
  const dateTimeObj = DateTime.fromFormat(dateTime, "dd/MM/yyyy h:mma");

  // Check if the parsing was successful
  if (!dateTimeObj.isValid) {
    return "";
  }

  // Return the ISO format string
  return dateTimeObj.toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

export function toCurrencyString(amount: number) {
  return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
