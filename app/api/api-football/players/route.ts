import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
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
    // Effettua la chiamata all'API interna
    const response = await ofetch(url);
    const responseJson = await response.json();
    // console.log("Dato restituito dalla route get-players: ", responseJson, url);

    // Salva la risposta in un file JSON per analisi con fx
    await writeJSON(responseJson, "app/api/api-football/players/resp.json");
    
    return NextResponse.json({ players: responseJson }, { status: 200 });
  } catch (error) {
    console.error("Errore nel recupero dei giocatori:", error);
    return NextResponse.json(
      { error: "Errore nel recupero dei giocatori" },
      { status: 500 }
    );
  }
}
