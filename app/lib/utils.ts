import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date utilities
export function getLastWeekDate(): string {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const year = lastWeek.getFullYear();
  const month = String(lastWeek.getMonth() + 1).padStart(2, '0');
  const day = String(lastWeek.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getTodayDate(): string {
  const today = new Date();
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getNextWeekDate(): string {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const year = nextWeek.getFullYear();
  const month = String(nextWeek.getMonth() + 1).padStart(2, '0');
  const day = String(nextWeek.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDateRange(_startDate: string, _endDate: string): string[] {
  const startDate = new Date(_startDate);
  const endDate = new Date(_endDate);
  const dateRange: string[] = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    dateRange.push(`${year}-${month}-${day}`);
    
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
export function formatDateWithDay(dateString: string): string {
  const today = new Date();
  const inputDate = new Date(dateString);
  
  // Check if date is today
  const isToday = today.getDate() === inputDate.getDate() && 
                  today.getMonth() === inputDate.getMonth() &&
                  today.getFullYear() === inputDate.getFullYear();
  
  if (isToday) {
    return 'oggi';
  }

  const days = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const dayName = days[inputDate.getDay()];

  return `${day}-${month} ${dayName}`;
}

/**
 * Converts a date string from ISO format with time to YYYY-MM-DD format
 * @param dateString - Date string in format "YYYY-MM-DDTHH:mm:ss+00:00" 
 * @returns Date string in format "YYYY-MM-DD"
 */
export function formatToYYYYMMDD(dateString: string): string {
  return dateString.split('T')[0];
}