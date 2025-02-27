import { deflateSync, inflateSync } from "zlib";
import { rd } from "../redis-db";
import { saveLogo } from "./redis-actions";

// Funzione per comprimere i dati prima di salvarli in Redis
export async function saveCompressedData(key, data, ttl) {
    // Converti i dati in JSON e poi comprimi
    
    const jsonData = JSON.stringify(data);
    const compressedData = deflateSync(Buffer.from(jsonData)).toString('base64');
    
    // Salva i dati compressi in Redis
    await rd.set(key, compressedData, { ex: ttl });
  }
  
  // Funzione per recuperare e decomprimere i dati da Redis
  export async function getCompressedData(key) {
    const compressedData = await rd.get(key);
    
    if (!compressedData || typeof compressedData !== 'string') return null;
    
    // Decomprimi i dati e converti in oggetto JavaScript
    const decompressedData = inflateSync(Buffer.from(compressedData, 'base64')).toString();
    return JSON.parse(decompressedData);
  }

// Funzione per ridurre la dimensione dei dati delle fixtures
export function optimizeFixtureData(fixture) {
    // Crea una versione ottimizzata della fixture
    return {
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      status: {
        short: fixture.fixture.status.short,
        elapsed: fixture.fixture.status.elapsed
      },
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        logo: fixture.league.logo
      },
      teams: {
        home: {
          id: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner
        },
        away: {
          id: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner
        }
      },
      goals: fixture.goals,
      isFavorite: fixture.isFavorite
    };
  }
  
  // Salva solo gli ID dei loghi e mantieni una tabella di lookup separata
  export function optimizeLogoUrls(fixture) {
    // Estrai le URL dei loghi
    const logos = {
      league: fixture.league.logo,
      homeTeam: fixture.teams.home.logo,
      awayTeam: fixture.teams.away.logo
    };
    
    // Salva le URL in una tabella di lookup
    for (const [key, url] of Object.entries(logos)) {
      if (url) {
        const logoId = generateLogoId(url); // Genera un ID univoco per l'URL
        saveLogo(logoId, url);
        logos[key] = logoId; // Sostituisci l'URL con l'ID
      }
    }
    
    // Modifica la fixture per usare gli ID invece delle URL complete
    const optimized = {...fixture};
    optimized.league.logo = logos.league;
    optimized.teams.home.logo = logos.homeTeam;
    optimized.teams.away.logo = logos.awayTeam;
    
    return optimized;
  }

// Genera un ID univoco per un URL di logo
function generateLogoId(url: string): string {
  // Crea un ID basato sull'URL (per esempio, prendi l'ultima parte dell'URL o usa un hash)
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1].split('.')[0]; // prende il nome del file senza estensione
  return `logo_${fileName}`;
} 