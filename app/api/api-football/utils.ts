

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

export const ofetch = (url: string) => {
    return fetch(url, requestOptions)
}

export const writeJSON = async (data: any, filePath: string) => {
  try {
    const respFilePath = path.join(process.cwd(), filePath);
    await writeFile(respFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (writeError) {
    console.error("Errore nel salvataggio del file:", writeError);
  }
}