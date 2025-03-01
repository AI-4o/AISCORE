import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ofetch } from '../utils';
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

// get api data of the fixtures of +- 7 days
export async function GET(r: NextRequest) {
    try {        
        // set the url
        const id = Object.fromEntries(r.nextUrl.searchParams)['fixture']
        const team1 = Object.fromEntries(r.nextUrl.searchParams)['team1']
        const team2 = Object.fromEntries(r.nextUrl.searchParams)['team2']
        const url1 = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${id}&team=${team1}`;
        const url2 = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${id}&team=${team2}`;

        const responses = await Promise.all([
            ofetch(url1),
            ofetch(url2)
        ]);
        const responseJson = await Promise.all(responses.map(r => r.json())); // TODO: create model for the response
        // console.log("Dato restituito dalla route get-statistics: ", responseJson);
        
        // Salva la risposta in un file JSON per analisi con fx
        try {
          const respFilePath = path.join(process.cwd(), 'app/api/api-football/statistics/resp.json');
          await writeFile(respFilePath, JSON.stringify(responseJson, null, 2), 'utf8');
          // console.log(`Risposta salvata in ${respFilePath}`);
        } catch (writeError) {
          console.error("Errore nel salvataggio del file:", writeError);
        }
        
        return NextResponse.json(responseJson, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' + (error as Error).message }, { status: 500 });
        }
}

