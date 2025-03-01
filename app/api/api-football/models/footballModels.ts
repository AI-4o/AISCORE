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

// Interfacce per i dati del giocatore
export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

export interface PlayerStatistics {
  player: Player;
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: League;
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: number;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: number;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      yellowred: number;
      red: number;
    };
    penalty: {
      won: number;
      committed: number;
      scored: number;
      missed: number;
      saved: number;
    };
  }>;
}

export interface PlayerTransfer {
  player: {
    id: number;
    name: string;
  };
  transfers: Array<{
    date: string;
    type: string;
    teams: {
      in: {
        id: number;
        name: string;
        logo: string;
      };
      out: {
        id: number;
        name: string;
        logo: string;
      };
    };
  }>;
}

export interface PlayerResponse {
  get: string;
  parameters: Record<string, string>;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Array<{
    player: Player;
  }>;
}

export interface PlayerStatisticsResponse {
  get: string;
  parameters: Record<string, string>;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: PlayerStatistics;
}

export interface PlayerTransferResponse {
  get: string;
  parameters: Record<string, string>;
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Array<PlayerTransfer>;
}

export interface LineupResponse {
  get: string;
  parameters: {
    fixture: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Lineup[];
}

export interface Lineup {
  team: {
    id?: number;
    name?: string;
    logo?: string;
  };
  formation: string;
  startXI: Array<{
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid?: string;
    };
  }>;
  substitutes: Array<{
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid?: string;
    };
  }>;
  coach: {
    id?: number;
    name?: string;
    photo?: string;
  };
}
