import { NextRequest, NextResponse } from "next/server";
import { ofetch, writeJSON } from "../utils";

// Get players by teamID
export async function GET(request: NextRequest) {
  try {
    // Ottieni il teamId dai parametri della query
    const { searchParams } = request.nextUrl;
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json({ error: "Team ID mancante" }, { status: 400 });
    }

    const url = `https://v3.football.api-sports.io/players/squads?team=${teamId}`;
    const responseJson = await ofetch(url);

    //await writeJSON(responseJson, "app/api/api-football/players/resp.json");
    return NextResponse.json({ players: responseJson }, { status: 200 });
  } catch (error) {
    console.error("Errore nel recupero dei giocatori:", error);
    return NextResponse.json(
      { error: "Errore nel recupero dei giocatori" },
      { status: 500 }
    );
  }
}
