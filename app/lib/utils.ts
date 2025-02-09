import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function getLastWeekDate(): Date {
  const today = new Date();
  return new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
}

export function getNextWeekDate(): Date {
  const today = new Date();
  return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
}

export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dateRange: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateRange;
}

export function compareDates(d: string, c: string): number {
  const date1 = new Date(d);
  const date2 = new Date(c);
  if (date1 < date2) {
    return -1;
  }
  return 1;
}

/**
 * Formatta una data aggiungendo il giorno della settimana in italiano
 * @param dateString - La data in formato ISO (YYYY-MM-DD)
 * @returns La data formattata con il giorno della settimana (es: "25-12 lunedì" o "oggi")
 */
export function formatDateWithDayName(d: Date): string {

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const days = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
  const dayIndex = mod(d.getDay() - 1 , 7);
  const dayName = days[dayIndex];

  // Check if the date is today
  if (d.toDateString() === new Date().toDateString()) {
    return "OGGI";
  }
  return `${day}-${month} ${dayName}`;
}

/**
 * Converts a date string from ISO format with time to YYYY-MM-DD format
 * @param dateString - iso string of a date
 * @returns Date string in format "YYYY-MM-DD"
 */
export function formatDateToYYYYMMDD(dateString: string): string {
  return dateString.split("T")[0];
}

/**
 * Estrae l'orario da una stringa di data in formato ISO
 * @param dateString - La data in formato "YYYY-MM-DDTHH:mm:ss+00:00"
 * @returns L'orario in formato "hh:mm"
 */
export function formatDateToHHmm(dateString: string): string {
  const timePart = dateString.split("T")[1];
  if (!timePart) {
    throw new Error("Formato data non valido");
  }
  const [hour, minute] = timePart.split(":");
  return `${hour}:${minute}`;
}

/**
 * Returns the modulo of m in the range [0, n-1]
 * Works with negative m values unlike the % operator
 * @param m - The number to convert (can be negative)
 * @param n - The modulo base (must be positive)
 * @returns The value of m modulo n in range [0, n-1]
 */
export function mod(m: number, n: number): number {
  if (n <= 0) {
    throw new Error("n must be positive");
  }
  return ((m % n) + n) % n;
}
