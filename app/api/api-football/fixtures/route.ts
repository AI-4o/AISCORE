import { NextRequest, NextResponse } from 'next/server';
import { formatDateToYYYYMMDD, getLastWeekDate } from '@/app/lib/utils';
import { getNextWeekDate } from '@/app/lib/utils';
import { getDateRange } from '@/app/lib/utils';
import { FixtureResponse } from '../models/footballModels';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ofetch } from '../utils';

// get api data of the fixtures of +- 7 days from today
export async function GET(r: NextRequest) {
    try {        
        // set the url
        const BASE_URL = 'https://v3.football.api-sports.io/fixtures?';
        // set the headers
        const dates = getDateRange(getLastWeekDate(), getNextWeekDate());
        const requests = dates.map( (date) => {
            const url = BASE_URL + `date=${formatDateToYYYYMMDD(date.toISOString())}`;
            return ofetch(url)})
        const responses = await Promise.all(requests); 
        const responseJson = await Promise.all(responses.map(r => r.json())) as FixtureResponse[];
        // console.log("Dato restituito dalla route get-fixtures: ", responseJson);
        
        // Salva la risposta in un file JSON per analisi con fx
        try {
          const respFilePath = path.join(process.cwd(), 'app/api/api-football/get-fixtures/resp.json');
          await writeFile(respFilePath, JSON.stringify(responseJson, null, 2), 'utf8');
          // console.log(`Risposta salvata in ${respFilePath}`);
        } catch (writeError) {
          console.error("Errore nel salvataggio del file:", writeError);
        }
        
        return NextResponse.json(responseJson, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
}