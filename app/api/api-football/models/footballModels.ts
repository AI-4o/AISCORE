/**
 * Fixture interface -> the endpoint is updated every 15 seconds
 */


export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
    standings: boolean;
  }
  
  export interface FavoriteLeague extends League {
    isFavorite: boolean
  }


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

export interface Fixture0 {
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
}

export interface Fixture {
    fixture: Fixture0;
    league: League;
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

export interface FavoriteFixture extends Fixture{
    isFavorite: boolean
}

export interface FavoriteLeagueFixture {
    league: FavoriteLeague;
    fixtures: FavoriteFixture[];
}

export interface Team {
    team: {
        id: number;
        name: string;
        code: string;
        country: string;
        founded: number;
        national: boolean;
        logo: string; // url to the team logo 
    };
    venue: {
        id: number;
        name: string;
        address: string;
        city: string;
        capacity: number;
        surface: string;
        image: string; // url to the venue image
    };
}