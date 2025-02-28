// utility to make calls to the api-football api with the correct headers including the api key

import { writeFile } from "fs/promises";
import path from 'path';

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

const myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", API_FOOTBALL_KEY || "");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
};

// example of overloading of the ofetch function
export function ofetch<T = any>(url: string): Promise<T>;
export function ofetch<T = any>(...urls: string[]): Promise<T[]>;
// implementation
/**
 * Fetch using the api-football api key, distinguish the case of a single url or multiple urls
 * @param urls 
 * @returns an array of the fetched data or a single object based on whether one or multiple urls are provided
 */
export async function ofetch<T = any>(...urls: string[]): Promise<T | T[]> {
  const promises = await Promise.all(urls.map(u => {
    return fetch(u, requestOptions)
  }));
  
  const results = await Promise.all(promises.map(p => p.json()));
  
  return urls.length === 1 ? results[0] as T : results as T[];
} 

export const writeJSON = async (data: any, filePath: string) => {
  try {
    const respFilePath = path.join(process.cwd(), filePath);
    await writeFile(respFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (writeError) {
    console.error("Errore nel salvataggio del file:", writeError);
  }
}