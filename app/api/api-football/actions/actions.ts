"use server";
import fs from "fs";
import path from "path";
import { API_PATH } from "appConfig";
import { DataType } from "../api-call.defs";
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://social-mastiff-50243.upstash.io',
  token: 'AcRDAAIjcDE0Y2U3NTM1MTU1MmE0ZDlkOGM0MzRkMGU4ZjI2YjcyYXAxMA',
})



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
