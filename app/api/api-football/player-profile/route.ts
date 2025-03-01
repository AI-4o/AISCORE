import { NextRequest, NextResponse } from 'next/server';
import { PlayerResponse, PlayerStatisticsResponse, PlayerTransferResponse } from '../models/footballModels';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ofetch, writeJSON } from '../utils';

// Get player data by player ID
export async function GET(request: NextRequest) {
    try {
        const params = Object.fromEntries(request.nextUrl.searchParams);
        const playerId = params.id;
        const season = params.season || new Date().getFullYear();
        
        // URLs for different endpoints
        const playerInfoUrl = `https://v3.football.api-sports.io/players/profiles?player=${playerId}`;
        
        // Fetch data from all endpoints in parallel
        const playerInfoRes = await ofetch(playerInfoUrl);
        
        // console.log("Player data retrieved:", combinedData);

    // Salva la risposta in un file JSON per analisi con fx
    //await writeJSON(combinedData, "app/api/api-football/player/resp.json");

    return NextResponse.json(playerInfoRes, { status: 200 });  
    } catch (error) {
        console.error('Error in get-player route:', error);
        return NextResponse.json({ error: 'Server error' + (error as Error).message }, { status: 500 });
    }
} 