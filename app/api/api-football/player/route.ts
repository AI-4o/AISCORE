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
        const playerInfoUrl = `https://v3.football.api-sports.io/players?id=${playerId}`;
        const playerStatsUrl = `https://v3.football.api-sports.io/players/statistics?season=${season}&player=${playerId}`;
        const playerTransfersUrl = `https://v3.football.api-sports.io/transfers?player=${playerId}`;
        
        // Fetch data from all endpoints in parallel
        const [playerInfoRes, playerStatsRes, playerTransfersRes] = await Promise.all([
            ofetch(playerInfoUrl),
            ofetch(playerStatsUrl),
            ofetch(playerTransfersUrl) 
        ]);
        const [playerInfoJson, playerStatsJson, playerTransfersJson] = await Promise.all([
            playerInfoRes.json() as Promise<PlayerResponse>,
            playerStatsRes.json() as Promise<PlayerStatisticsResponse>,
            playerTransfersRes.json() as Promise<PlayerTransferResponse>
        ]);

        // Combine results into a single response
        const combinedData = {
            playerInfo: playerInfoJson,
            playerStats: playerStatsJson,
            playerTransfers: playerTransfersJson
        };
        
        // console.log("Player data retrieved:", combinedData);

    // Salva la risposta in un file JSON per analisi con fx
    //await writeJSON(combinedData, "app/api/api-football/player/resp.json");

    return NextResponse.json(combinedData, { status: 200 });
    } catch (error) {
        console.error('Error in get-player route:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
} 