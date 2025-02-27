import { getLogo, saveLogo } from './redis-actions';

/**
 * Ottiene un'immagine da un URL, con supporto alla cache.
 * Cerca prima nella cache Redis, poi recupera da remoto se necessario.
 * 
 * @param url URL dell'immagine da recuperare
 * @returns Promise con i dati dell'immagine in base64
 */
export async function getLogoWithCache(url: string): Promise<string> {
  try {
    // Prima verifica se l'immagine è nella cache
    const cachedLogo = await getLogo(url);
    
    if (cachedLogo) {
      // console.log(`Logo recuperato dalla cache: ${url}`);
      return cachedLogo;
    }
    
    // Se non è in cache, recupera l'immagine e la salva in base64
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Errore nel recupero dell'immagine: ${response.status}`);
    }
    
    // Converti l'immagine in ArrayBuffer, poi in base64
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    // Ottieni il Content-Type
    const contentType = response.headers.get('Content-Type') || 'image/png';
    
    // Crea la stringa data URL
    const base64Image = `data:${contentType};base64,${base64}`;
    
    // Salva nella cache
    await saveLogo(url, base64Image);
    // console.log(`Logo salvato nella cache: ${url}`);
    
    return base64Image;
  } catch (error) {
    console.error(`Errore nel recupero dell'immagine: ${url}`, error);
    // In caso di errore, restituisci un'immagine placeholder o l'URL originale
    return url;
  }
}

/**
 * Cerca tutte le URL di immagini in un oggetto o array e le sostituisce con versioni cached
 * Effettua ricerca ricorsiva di proprietà "logo", "image", "flag" e simili
 * 
 * @param data Oggetto o array da processare
 * @returns Promise con dati dove le URL sono sostituite da data URL base64
 */
export async function processImagesInData(data: any): Promise<any> {
  if (!data) return data;
  
  // Se è un array, processa ogni elemento
  if (Array.isArray(data)) {
    return await Promise.all(data.map(item => processImagesInData(item)));
  }
  
  // Se è un oggetto, processa ogni proprietà
  if (typeof data === 'object') {
    const result = { ...data };
    
    // Lista di proprietà che potrebbero contenere URL di immagini
    const imageProps = ['logo', 'image', 'flag', 'photo'];
    
    // Elabora in parallelo tutte le promesse per le proprietà di immagini
    const promises = [] as Promise<void>[];
    
    for (const key of Object.keys(result)) {
      // Se la proprietà è un URL di immagine
      if (
        imageProps.includes(key) && 
        typeof result[key] === 'string' &&
        result[key].startsWith('http')
      ) {
        // Aggiungi la promessa all'array
        promises.push(
          (async () => {
            result[key] = await getLogoWithCache(result[key]);
          })()
        );
      } 
      // Altrimenti processa ricorsivamente oggetti e array
      else if (result[key] !== null && typeof result[key] === 'object') {
        promises.push(
          (async () => {
            result[key] = await processImagesInData(result[key]);
          })()
        );
      }
    }
    
    // Attendi che tutte le sostituzioni di immagini siano complete
    await Promise.all(promises);
    
    return result;
  }
  
  // Restituisci il dato originale se non è né un array né un oggetto
  return data;
} 