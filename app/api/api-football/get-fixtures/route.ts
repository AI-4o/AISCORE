import { NextRequest, NextResponse } from 'next/server';
import { formatDateToYYYYMMDD, getLastWeekDate } from '@/app/lib/utils';
import { getNextWeekDate } from '@/app/lib/utils';
import { getDateRange } from '@/app/lib/utils';
import { FixtureResponse } from '../models/footballModels';
import { saveFixturesByDate, getOrSet } from '../utils/redis-actions';
import { ofetch, writeJSON } from '../utils';


// get api data of the fixtures of +- 7 days from today
export async function GET(r: NextRequest) {
    try {        
        // set the url
        const BASE_URL = 'https://v3.football.api-sports.io/fixtures?';

        const dates = getDateRange(getLastWeekDate(), getNextWeekDate());
        const getFixturePromises = (dates: Date[]) => {
            const fixturePromises = dates.map(date => {
                const formattedDate = formatDateToYYYYMMDD(date.toISOString());
                const cacheKey = `fixtures:date:${formattedDate}`;
                
                return getOrSet(cacheKey, async () => {
                    const url = BASE_URL + `date=${formattedDate}`;
                    const response = await ofetch(url);
                    const data = await response.json() as FixtureResponse;
                    
                    // Se ci sono dati validi, salviamoli anche nella cache per singola data
                    if (data.response && data.response.length > 0) {
                        await saveFixturesByDate(formattedDate, data.response);
                    }
                    
                    return data;
                }, 3600); // 1 ora di cache
            });
            return fixturePromises;
        }
        
        // Utilizziamo Promise.all per eseguire tutte le richieste in parallelo
        // e mappiamo ciascuna data per verificare prima la cache

        const fixturePromises = getFixturePromises(dates.slice(0, 10));
        
        
        // Attendi il completamento di tutte le promesse
        const res = await Promise.all(fixturePromises) as FixtureResponse[];
        
        console.log("Dato restituito dalla route get-fixtures: ", res);
        
        // Salva la risposta in un file JSON per analisi con fx
        await writeJSON(res, "app/api/api-football/get-fixtures/resp.json");
        
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
} 

