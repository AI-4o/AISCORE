"use server";
import fs from "fs";
import path from "path";
import { API_PATH } from "appConfig";
import { DataType } from "../utils";
import qs from "qs";
import { FixtureResponse } from "../models/fixture";
import { Redis } from '@upstash/redis'

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;



const redis = new Redis({
  url: 'https://social-mastiff-50243.upstash.io',
  token: 'AcRDAAIjcDE0Y2U3NTM1MTU1MmE0ZDlkOGM0MzRkMGU4ZjI2YjcyYXAxMA',
})

/**
 * Fetch data from API Football
 * @param dataName - The name of the data to fetch
 * @param queryParams - The query parameters to pass to the API
 * @param writeMock - Whether to write the mock response to a .json file
 * @returns The response from the API
 */
export const fetchAPIFootball = async (
  dataName: DataType,
  queryParams: Record<string, string | number | boolean>,
  writeMock: boolean = false
) => {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", API_FOOTBALL_KEY || "");
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
  };
  const url = `https://v3.football.api-sports.io/${dataName}?${qs.stringify(queryParams)}`;
  console.log("fetchAPIFootball", url);
  const response = await fetch(url, requestOptions).then(res => res.json()) as FixtureResponse;
  if (writeMock) {
    await writeMockResponse(response, dataName, new Date().toISOString());
  }
  return response;
};

/**
 * Write API Football response to mock file
 * @param data - The response data from API Football
 */
export const writeMockResponse = async (
  data: any,
  dataType: DataType,
  id: string
) => {
  try {
    const mockDir = path.join(
      API_PATH,
      `api-football/mock-responses/mock-${dataType}`
    );
    // Create directory if it doesn't exist
    if (!fs.existsSync(mockDir)) {
      fs.mkdirSync(mockDir, { recursive: true });
    }
    const filePath = path.join(mockDir, `mock-${dataType}-${id}.json`);

    // Create file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "{}", "utf8");
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing mock response:", error);
  }
};



