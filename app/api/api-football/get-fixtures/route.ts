import { NextRequest, NextResponse } from "next/server";
import { formatDateToYYYYMMDD, getLastWeekDate } from "@/app/lib/utils";
import { getNextWeekDate } from "@/app/lib/utils";
import { getDateRange } from "@/app/lib/utils";
import { FixtureResponse } from "../models/footballModels";
import { ofetch, writeJSON } from "../utils";

// get api data of the fixtures of +- 7 days from today
export async function GET(r: NextRequest) {
  try {
    // set the url
    const BASE_URL = "https://v3.football.api-sports.io/fixtures?";

    const dates = getDateRange(getLastWeekDate(), getNextWeekDate());
    const urls = dates.map((date) => {
      const formattedDate = formatDateToYYYYMMDD(date.toISOString());
      return BASE_URL + `date=${formattedDate}`;
    });
    const fixtures = await ofetch<FixtureResponse>(...urls);
    // await writeJSON(fixtures, "app/api/api-football/get-fixtures/resp.json");
    return NextResponse.json(fixtures, { status: 200 });
  } catch (error) {
    console.error("Errore nella route get-api:", error);
    return NextResponse.json({ error: "Errore nel server" + (error as Error).message }, { status: 500 });
  }
}
