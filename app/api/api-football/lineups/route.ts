import { NextRequest, NextResponse } from "next/server";
import { ofetch, writeJSON } from "../utils";
import { LineupResponse } from "../models/footballModels";

// Get lineups by fixtureId
export async function GET(request: NextRequest) {
  try {
    // Ottieni il teamId dai parametri della query
    const { searchParams } = request.nextUrl;
    const fixtureId = searchParams.get("fixtureId");

    if (!fixtureId) {
      return NextResponse.json({ error: "Fixture ID mancante" }, { status: 400 });
    }

    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`;
    const responseJson = await ofetch<LineupResponse>(url);

    await writeJSON(responseJson, "app/api/api-football/lineups/resp.json");
    return NextResponse.json({ lineups: responseJson.response }, { status: 200 });
  } catch (error) {
    console.error("Errore nel recupero delle formazioni:", error);
    return NextResponse.json(
      { error: "Errore nel recupero delle formazioni" + (error as Error).message },
      { status: 500 }
    );
  }
}
