

import { NextRequest, NextResponse } from 'next/server';
import { PlayerResponse, PlayerStatisticsResponse, PlayerTransferResponse } from '../models/footballModels';
import { ofetch } from '../utils';
import { 
    savePlayer, 
    savePlayerStatistics, 
    savePlayerTransfers,
    getOrSet
} from '../utils/redis-actions';


// Get player data by player ID
export async function GET(request: NextRequest) {
    try {
        const params = Object.fromEntries(request.nextUrl.searchParams);
        const playerId = parseInt(params.id);
        const season = params.season ? parseInt(params.season) : new Date().getFullYear();
    } catch (error) {
        console.error('Error in get-player route:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
/*
        // URLs for different endpoints
        const playerInfoUrl = `https://v3.football.api-sports.io/players?id=${playerId}`;
        const playerStatsUrl = `https://v3.football.api-sports.io/players/statistics?season=${season}&player=${playerId}`;
        const playerTransfersUrl = `https://v3.football.api-sports.io/transfers?player=${playerId}`;
        
        // Prova a recuperare i dati dalla cache, altrimenti chiama l'API
        const playerInfoPromise = getOrSet(`player:${playerId}`, async () => {
            const res = await ofetch<PlayerResponse>(playerInfoUrl);
            
            // Salva il player nella cache
            if (res.response && res.response.length > 0 && res.response[0].player) {
                await savePlayer(res.response[0].player);
            }
            
            return res;
        }, 86400 * 7); // 7 giorni di cache

        const playerStatsPromise = getOrSet(`player:stats:${playerId}:${season}`, async () => {
            const res = await ofetch<PlayerStatisticsResponse>(playerStatsUrl);
            
            // Salva le statistiche nella cache
            if (res.response && res.response.length > 0) {
                await savePlayerStatistics(playerId, res.response, season);
            }
            
            return res;
        }, 86400); // 1 giorno di cache


        
        const playerTransfersPromise = getOrSet(`player:transfers:${playerId}`, async () => {
            const res = await ofetch<PlayerTransferResponse>(playerTransfersUrl);
            
            // Salva i trasferimenti nella cache
            if (res.response && res.response.length > 0) {
                await savePlayerTransfers(playerId, res.response);
            }
            
            return res;
        }, 86400 * 30); // 30 giorni di cache
        
        // Fetch data from all endpoints in parallel
        const [playerInfoRes, playerStatsRes, playerTransfersRes] = await Promise.all([
            playerInfoPromise,
            playerStatsPromise,
            playerTransfersPromise
        ]);
        
        // Combine results into a single response
        const combinedData = {
            playerInfo: playerInfoRes,
            playerStats: playerStatsRes,
            playerTransfers: playerTransfersRes
        };
        
        console.log("Player data retrieved:", combinedData);
        
        
        return NextResponse.json(combinedData, { status: 200 });
    } catch (error) {
        console.error('Error in get-player route:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
} */