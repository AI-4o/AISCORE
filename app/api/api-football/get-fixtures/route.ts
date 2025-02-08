import { NextRequest, NextResponse } from 'next/server';
import { getLastWeekDate } from '@/app/lib/utils';
import { getNextWeekDate } from '@/app/lib/utils';
import { getDateRange } from '@/app/lib/utils';
import { FixtureResponse } from '../models/fixture';

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

// get api data
export async function GET(request: NextRequest) {
    try {        
        // set the url
        const BASE_URL = 'https://v3.football.api-sports.io/fixtures?';
        // set the headers
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", API_FOOTBALL_KEY || "");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
      
        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
        };
        const dates = getDateRange(getLastWeekDate(), getNextWeekDate());
        const requests = dates.map( (date) => {
            const url = BASE_URL + `date=${date}`;
            return fetch(url, requestOptions).then(r => r.json())})
        const res = await Promise.all(requests) as FixtureResponse[];
        console.log("Dato restituito dalla route get-fixtures: ", res);
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
}