// Costanti per i prefissi delle chiavi
const P = {
    PLAYER: 'player',
    PLAYER_STATISTICS: 'player:stats',
    PLAYER_TRANSFERS: 'player:transfers',
    FIXTURE: 'fixture',
    FIXTURES_BY_DATE: 'fixtures:date',
    FIXTURES_BY_LEAGUE: 'fixtures:league',
    FIXTURES_BY_TEAM: 'fixtures:team',
    LEAGUE: 'league',
    TEAM: 'team',
    LOGO: 'logo',
  };
  
  // Costanti per TTL (Time To Live) in secondi
  const TTL = {
    PLAYER: 86400 * 7,          // 7 giorni per i dati dei giocatori
    PLAYER_STATISTICS: 86400,    // 1 giorno per le statistiche
    PLAYER_TRANSFERS: 86400 * 30, // 30 giorni per i trasferimenti
    FIXTURE: 3600,               // 1 ora per le partite 
    FIXTURE_LIVE: 15,            // 15 secondi per partite in corso
    LEAGUE: 86400 * 7,           // 7 giorni per i dati delle leghe
    TEAM: 86400 * 7,             // 7 giorni per i dati delle squadre
    LOGO: 86400 * 30,            // 30 giorni per i loghi
  };
  
  // Helpers per generare le chiavi
  const getPlayerKey = (playerId: number) => `${P.PLAYER}:${playerId}`;
  const getPlayerStatsKey = (playerId: number, season?: number) => 
    `${P.PLAYER_STATISTICS}:${playerId}${season ? `:${season}` : ''}`;
  const getPlayerTransfersKey = (playerId: number) => `${P.PLAYER_TRANSFERS}:${playerId}`;
  const getFixtureKey = (fixtureId: number) => `${P.FIXTURE}:${fixtureId}`;
  const getFixturesByDateKey = (date: string) => `${P.FIXTURES_BY_DATE}:${date}`;
  const getFixturesByLeagueKey = (leagueId: number, date?: string) => 
    `${P.FIXTURES_BY_LEAGUE}:${leagueId}${date ? `:${date}` : ''}`;
  const getFixturesByTeamKey = (teamId: number) => `${P.FIXTURES_BY_TEAM}:${teamId}`;
  const getLeagueKey = (leagueId: number) => `${P.LEAGUE}:${leagueId}`;
  const getTeamKey = (teamId: number) => `${P.TEAM}:${teamId}`;
  const getLogoKey = (url: string) => `${P.LOGO}:${encodeURIComponent(url)}`;

  export { P, TTL, getPlayerKey, getPlayerStatsKey, getPlayerTransfersKey, getFixtureKey, getFixturesByDateKey, getFixturesByLeagueKey, getFixturesByTeamKey, getLeagueKey, getTeamKey, getLogoKey };