/**
 * Fixture interface -> the endpoint is updated every 15 seconds
 */


export interface FixtureResponse {  
    get: string;
    parameters: {
        id: string;
        date: string;
        status: string;
    };
    errors: any[];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: Array<Fixture>;
}


export interface Fixture {
    fixture: {
        id: number;
        referee: string | null;
        timezone: string;
        date: string;
        timestamp: number;
        periods: {
            first: number | null;
            second: number | null;
        };
        venue: {
            id: number | null;
            name: string | null;
            city: string | null;
        };
        status: {
            long: string;
            short: string;
            elapsed: number;
            extra: number | null;
        };
    };
    league: {
        id: number;
        name: string;
        country: string;
        logo: string; // url to the league logo 
        flag: string | null; // url to the league flag 
        season: number;
        round: string;
        standings: boolean;
    };
    teams: {
        home: {
            id: number;
            name: string;
            logo: string; // url to the team logo 
            winner: boolean | null;
        };
        away: {
            id: number;
            name: string;
            logo: string; // url to the team logo 
            winner: boolean | null;
        };
    };
    goals: {
        home: number;
        away: number;
    };
    score: {
        halftime: {
            home: number | null;
            away: number | null;
        };
        fulltime: {
            home: number;
            away: number;
        };
        extratime: {
            home: number | null;
            away: number | null;
        };
        penalty: {
            home: number | null;
            away: number | null;
        };
    };
}