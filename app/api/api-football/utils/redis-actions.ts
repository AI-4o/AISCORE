import { 
  Player, 
  PlayerStatistics, 
  PlayerTransfer, 
  Fixture, 
  League, 
  Team 
} from '../models/footballModels';
import { saveCompressedData, getCompressedData, optimizeFixtureData, optimizeLogoUrls } from './redis-optimization';
import { rd } from '../redis-db';
import { getPlayerKey, getPlayerStatsKey, getPlayerTransfersKey, getFixtureKey, getFixturesByDateKey, getFixturesByLeagueKey, getLeagueKey, getTeamKey, getLogoKey, P, TTL } from './redis-helpers';

// ----- PLAYERS ----- //

/**
 * Salva le informazioni di un giocatore
 */
export async function savePlayer(player: Player): Promise<void> {
  await rd.set(getPlayerKey(player.id), JSON.stringify(player), { ex: TTL.PLAYER });
}

/**
 * Recupera le informazioni di un giocatore
 */
export async function getPlayer(playerId: number): Promise<Player | null> {
  const data = await rd.get<string>(getPlayerKey(playerId));
  return data ? JSON.parse(data) : null;
}

/**
 * Salva le statistiche di un giocatore
 */
export async function savePlayerStatistics(playerId: number, statistics: PlayerStatistics, season?: number): Promise<void> {
  await rd.set(getPlayerStatsKey(playerId, season), JSON.stringify(statistics), { ex: TTL.PLAYER_STATISTICS });
}

/**
 * Recupera le statistiche di un giocatore
 */
export async function getPlayerStatistics(playerId: number, season?: number): Promise<PlayerStatistics | null> {
  const data = await rd.get<string>(getPlayerStatsKey(playerId, season));
  return data ? JSON.parse(data) : null;
}

/**
 * Salva i trasferimenti di un giocatore
 */
export async function savePlayerTransfers(playerId: number, transfers: PlayerTransfer): Promise<void> {
  await rd.set(getPlayerTransfersKey(playerId), JSON.stringify(transfers), { ex: TTL.PLAYER_TRANSFERS });
}

/**
 * Recupera i trasferimenti di un giocatore
 */
export async function getPlayerTransfers(playerId: number): Promise<PlayerTransfer | null> {
  const data = await rd.get<string>(getPlayerTransfersKey(playerId));
  return data ? JSON.parse(data) : null;
}

// ----- FIXTURES ----- //

/**
 * Salva una partita
 */
export async function saveFixture(fixture: Fixture): Promise<void> {
  const fixtureId = fixture.fixture.id;
  const isLive = ['1H', '2H', 'HT', 'ET', 'P', 'BT'].includes(fixture.fixture.status.short);
  const ttl = isLive ? TTL.FIXTURE_LIVE : TTL.FIXTURE;
  
  await rd.set(getFixtureKey(fixtureId), JSON.stringify(fixture), { ex: ttl });
}

/**
 * Recupera una partita
 */
export async function getFixture(fixtureId: number): Promise<Fixture | null> {
  const data = await rd.get<string>(getFixtureKey(fixtureId));
  return data ? JSON.parse(data) : null;
}

/**
 * Salva le partite di un determinato giorno
 */
export async function saveFixturesByDate(date: string, fixtures: Fixture[]): Promise<void> {
  // Raggruppa le fixtures per lega
  const fixturesByLeague: Record<string, any[]> = {};
  
  for (const fixture of fixtures) {
    const leagueId = fixture.league.id;
    if (!fixturesByLeague[leagueId]) {
      fixturesByLeague[leagueId] = [];
    }
    
    // Salva una versione ottimizzata della fixture
    fixturesByLeague[leagueId].push(optimizeFixtureData(fixture));
  }
  
  // Salva ogni gruppo di fixtures separatamente
  for (const [leagueId, leagueFixtures] of Object.entries(fixturesByLeague)) {
    // Se ci sono troppe fixtures, suddividile in batch più piccoli
    const MAX_FIXTURES_PER_BATCH = 20;
    
    if (leagueFixtures.length <= MAX_FIXTURES_PER_BATCH) {
      // Batch piccolo, salva direttamente
      const key = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}`;
      await saveCompressedData(key, leagueFixtures, TTL.FIXTURE);
    } else {
      // Suddividi in batch più piccoli
      const batches: any[][] = [];
      for (let i = 0; i < leagueFixtures.length; i += MAX_FIXTURES_PER_BATCH) {
        batches.push(leagueFixtures.slice(i, i + MAX_FIXTURES_PER_BATCH));
      }
      
      // Salva ogni batch con un indice
      for (let i = 0; i < batches.length; i++) {
        const key = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}:batch:${i}`;
        await saveCompressedData(key, batches[i], TTL.FIXTURE);
      }
      
      // Salva i metadati del batch
      const batchMetadata = {
        totalBatches: batches.length,
        totalFixtures: leagueFixtures.length
      };
      const metadataKey = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}:metadata`;
      await rd.set(metadataKey, JSON.stringify(batchMetadata), { ex: TTL.FIXTURE });
    }
  }
  
  // Salva anche l'elenco delle leghe disponibili per quella data
  const leagueIds = Object.keys(fixturesByLeague);
  await rd.set(`${P.FIXTURES_BY_DATE}:${date}:leagues`, JSON.stringify(leagueIds), { ex: TTL.FIXTURE });
}

/**
 * Recupera le partite di un determinato giorno
 */
export async function getFixturesByDate(date: string): Promise<Fixture[] | null> {
  // Recupera l'elenco delle leghe
  const leagueIdsStr = await rd.get(`${P.FIXTURES_BY_DATE}:${date}:leagues`);
  const leagueIds = leagueIdsStr ? JSON.parse(leagueIdsStr as string) : [];
  
  // Recupera le fixtures per ogni lega
  const allFixtures: any[] = [];
  
  for (const leagueId of leagueIds) {
    // Verifica se le fixtures sono state salvate in batch
    const metadataKey = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}:metadata`;
    const metadataStr = await rd.get(metadataKey);
    
    if (metadataStr) {
      // Le fixtures sono state salvate in batch
      const metadata = JSON.parse(metadataStr as string);
      const batchPromises: Promise<any>[] = [];
      
      // Recupera tutti i batch in parallelo
      for (let i = 0; i < metadata.totalBatches; i++) {
        const batchKey = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}:batch:${i}`;
        batchPromises.push(getCompressedData(batchKey));
      }
      
      // Attendi tutti i batch e concatenali
      const batchResults = await Promise.all(batchPromises);
      for (const batch of batchResults) {
        if (batch) {
          allFixtures.push(...batch);
        }
      }
    } else {
      // Prova a recuperare il set completo (caso non in batch)
      const key = `${P.FIXTURES_BY_DATE}:${date}:league:${leagueId}`;
      const leagueFixtures = await getCompressedData(key);
      if (leagueFixtures) {
        allFixtures.push(...leagueFixtures);
      }
    }
  }
  
  return allFixtures.length > 0 ? allFixtures : null;
}

/**
 * Salva le partite di una lega
 */
export async function saveFixturesByLeague(leagueId: number, fixtures: Fixture[], date?: string): Promise<void> {
  await rd.set(getFixturesByLeagueKey(leagueId, date), JSON.stringify(fixtures), { ex: TTL.FIXTURE });
}

/**
 * Recupera le partite di una lega
 */
export async function getFixturesByLeague(leagueId: number, date?: string): Promise<Fixture[] | null> {
  const data = await rd.get<string>(getFixturesByLeagueKey(leagueId, date));
  return data ? JSON.parse(data) : null;
}

// ----- LEAGUES ----- //

/**
 * Salva i dati di una lega
 */
export async function saveLeague(league: League): Promise<void> {
  await rd.set(getLeagueKey(league.id), JSON.stringify(league), { ex: TTL.LEAGUE });
}

/**
 * Recupera i dati di una lega
 */
export async function getLeague(leagueId: number): Promise<League | null> {
  const data = await rd.get<string>(getLeagueKey(leagueId));
  return data ? JSON.parse(data) : null;
}

// ----- TEAMS ----- //

/**
 * Salva i dati di una squadra
 */
export async function saveTeam(team: Team): Promise<void> {
  await rd.set(getTeamKey(team.team.id), JSON.stringify(team), { ex: TTL.TEAM });
}

/**
 * Recupera i dati di una squadra
 */
export async function getTeam(teamId: number): Promise<Team | null> {
  const data = await rd.get<string>(getTeamKey(teamId));
  return data ? JSON.parse(data) : null;
}

// ----- LOGOS & IMAGES ----- //

/**
 * Salva un'immagine (logo) come base64
 */
export async function saveLogo(url: string, base64Data: string): Promise<void> {
  await rd.set(getLogoKey(url), base64Data, { ex: TTL.LOGO });
}

/**
 * Recupera un'immagine (logo) in base64
 */
export async function getLogo(url: string): Promise<string | null> {
  return await rd.get<string>(getLogoKey(url));
}

// ----- CACHE UTILITIES ----- //

/**
 * Invalida la cache per una determinata chiave
 */
export async function invalidateCache(key: string): Promise<void> {
  await rd.del(key);
}

/**
 * Data una chiave, se è presente in cache, la restituisce, altrimenti la recupera dall'api remota con la fetchFunction,
 *  la salva in cache e la ritorna.
 * @param key - La chiave da cercare in cache
 * @param fetchFunction - La funzione da eseguire se la chiave non è in cache
 * @param ttl - Il tempo di vita in secondi
 */
export async function getOrSet<T>(
  key: string, 
  fetchFunction: () => Promise<T>, 
  ttl: number
): Promise<T> {
  const cachedData = await rd.get<string>(key);
  
  if (cachedData) {
    try {
      // Assicurati che cachedData sia una stringa prima di fare il parsing
      if (typeof cachedData === 'string') {
        return JSON.parse(cachedData) as T;
      } else if (typeof cachedData === 'object') {
        // Se è già un oggetto, restituiscilo direttamente
        return cachedData as unknown as T;
      }
    } catch (error) {
      console.error(`Errore nel parsing dei dati in cache per la chiave ${key}:`, error);
      // In caso di errore, invalidare la cache e procedere come se non ci fossero dati in cache
      await invalidateCache(key);
    }
  }
  
  const data = await fetchFunction();
  
  try {
    // Salva i dati solo se non sono undefined o null
    if (data !== undefined && data !== null) {
      await rd.set(key, JSON.stringify(data), { ex: ttl });
    }
  } catch (error) {
    console.error(`Errore nel salvataggio dei dati in cache per la chiave ${key}:`, error);
  }
  
  return data;
}



