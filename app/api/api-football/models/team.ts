/**
 * Team interface -> recommended 1 request per day
 */
export interface TeamResponse {
    get: string;
    parameters: {
        id: string;
    };
    errors: any[];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: Array<Team>;
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