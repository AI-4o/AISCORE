import { NextRequest, NextResponse } from 'next/server';
import { DataType } from '../utils';
import { fetchAPIFootball } from '../actions/actions';

// get api data
export async function GET(request: NextRequest) {
    try {
        const params= Object.fromEntries(request.nextUrl.searchParams)
        //console.log("Params received at route get-api", params);
        // call the api
        const { mock, writeMock, dataType,...queryParams } = params;
        const res = await fetchAPIFootball(params.dataType as DataType, queryParams, writeMock == 'true')
        console.log("Dato restituito dalla route get-api: ", res);
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.error('Errore nella route get-api:', error);
        return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
        }
}