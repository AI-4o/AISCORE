import { Redis } from "@upstash/redis";

// Inizializza il client Redis
export const rd = new Redis({
    url: 'https://social-mastiff-50243.upstash.io',
    token: 'AcRDAAIjcDE0Y2U3NTM1MTU1MmE0ZDlkOGM0MzRkMGU4ZjI2YjcyYXAxMA',
  });