import { Fixture } from "api/api-football/models/fixture";
import { League } from "api/api-football/models/league";
import { compareDates, formatDateWithDay } from "utils";

export type LeagueFixtures = Array<{
  league: League;
  fixtures: Fixture[];
}>;
/**
 * This function is used in dirette-table.tsx to get the correct format to feed to the table, out of the fixtures[] of the store
 * @param fixtures
 * @param filterSortParams params for filtering and sorting
 * @returns LeagueFixtures
 */
export const getDiretteTableData = (fixtures: Fixture[], selectedDay: string): LeagueFixtures => {

  // sort fixtures by date
  fixtures = sortFixturesByDate(fixtures)
  .filter(f => {
    //console.log(formatDateWithDay(f.fixture.date), formatDateWithDay(selectedDay));
    return formatDateWithDay(f.fixture.date) === formatDateWithDay(selectedDay)
  });
  
  const leagues = Array.from(
    new Map(fixtures.map(fixture => [fixture.league.id, fixture.league])).values()
  );
  //console.log('fixtures in getDiretteTableData: ', fixtures, leagues);
  
  // costruisci leagueFixtures
  const leagueFixtures = leagues.map((league) => {
    const _fixtures = fixtures.filter(
      (fixture) => fixture.league.id === league.id
    );
    return {
      league: league as League,
      fixtures: _fixtures,
    };
  });
  // ordina leagueFixtures
  orderLeagueFixtures(leagueFixtures, 'default');
  return leagueFixtures;
}

export const orderLeagueFixtures = (leagueFixtures: LeagueFixtures, order: 'default' | {config: any}) => {
  if(order === 'default') return leagueFixtures.sort((a, b) => defaultSortingLeagues(a.league.id, b.league.id));
}

const defaultSortingLeagues = (leagueId1: number, leagueId2: number): number => {
    // the ids of the leagues to be shown first
    const firstIds = [ 135, 78, 39, 41, 140, 136]
    if(!firstIds.includes(leagueId1) && !firstIds.includes(leagueId2)) return 1;
    if(firstIds.includes(leagueId1) && !firstIds.includes(leagueId2)) return -1;
    if(!firstIds.includes(leagueId1) && firstIds.includes(leagueId2)) return 1;
    if(firstIds.includes(leagueId1) && firstIds.includes(leagueId2)) return firstIds.indexOf(leagueId1) - firstIds.indexOf(leagueId2);
    return 0;
}

const sortFixturesByDate = (fixtures: Fixture[]) => {
  // Create a new array before sorting
  const sortedFixtures = [...fixtures].sort((a, b) => compareDates(a.fixture.date, b.fixture.date));
  return sortedFixtures;
}