import { NextRequest, NextResponse } from 'next/server';
import { DataType } from '../api-call.defs';
import { FixtureResponse } from "../models/footballModels";
import { writeMockResponse } from '../actions/actions';
import { config } from 'appConfig';
import qs from 'qs';

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

// get api data
export async function GET(request: NextRequest) {
    try {
        const params= Object.fromEntries(request.nextUrl.searchParams)
        
        // set the url
        const url = `https://v3.football.api-sports.io/${params.dataType}?${qs.stringify(params.queryParams)}`;
        //console.log("url in the get-api route: ", url, params.queryParams);
        
        // set the headers
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", API_FOOTBALL_KEY || "");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
      
        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect, // Explicitly cast to RequestRedirect
        };
        
        const res = await fetch(url, requestOptions).then(r => r.json()) as FixtureResponse;
        if (config.writeMockAPICall) await writeMockResponse(res, params.dataType as DataType, new Date().toISOString());
        
        //console.log("Dato restituito dalla route get-api: ", res);
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
}