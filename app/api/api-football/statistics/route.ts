import { NextRequest, NextResponse } from 'next/server';

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
        // set the headers
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", API_FOOTBALL_KEY || "");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
      
        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
        }
        const responses = await Promise.all([
            fetch(url1, requestOptions),
            fetch(url2, requestOptions)
        ].map(r => r.then(r => r.json())));
        console.log("Dato restituito dalla route get-statistics: ", responses);
        return NextResponse.json(responses, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
}

