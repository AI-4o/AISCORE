import { useEffect, useState } from "react";
import { config } from "appConfig";
import Image from "next/image";
import { Fixture } from "@/app/api/api-football/models/footballModels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Card, CardContent } from "components/ui/card";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface PlayerGamesProps {
  playerId: number;
}

interface PlayerFixtures {
  played: Fixture[];
  upcoming: Fixture[];
}

export default function PlayerGames({ playerId }: PlayerGamesProps) {
  const [fixtures, setFixtures] = useState<PlayerFixtures>({
    played: [],
    upcoming: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerFixtures = async () => {
      try {
        setLoading(true);
        const currentSeason = new Date().getFullYear();
        
        // Chiamata all'API per ottenere le partite del giocatore
        const response = await fetch(
          `/api/api-football/get-api?dataType=fixtures&queryParams=${encodeURIComponent(
            JSON.stringify({
              player: playerId,
              season: currentSeason,
              last: 20  // Ultime 20 partite giocate
            })
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(async (res) => await res.json());

        // Chiamata all'API per ottenere le prossime partite del giocatore
        const upcomingResponse = await fetch(
          `/api/api-football/get-api?dataType=fixtures&queryParams=${encodeURIComponent(
            JSON.stringify({
              player: playerId,
              season: currentSeason,
              next: 10  // Prossime 10 partite
            })
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(async (res) => await res.json());

        const played = response.response || [];
        const upcoming = upcomingResponse.response || [];
        
        setFixtures({
          played,
          upcoming
        });
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento delle partite:", err);
        setError("Si è verificato un errore durante il caricamento delle partite.");
        setLoading(false);
      }
    };

    fetchPlayerFixtures();
  }, [playerId]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Caricamento partite...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (fixtures.played.length === 0 && fixtures.upcoming.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Nessuna partita disponibile per questo giocatore.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Partite</h2>
      
      <Tabs defaultValue="played" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="played" className="flex-1">Partite giocate ({fixtures.played.length})</TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">Prossime partite ({fixtures.upcoming.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="played">
          <div className="space-y-4">
            {fixtures.played.map((fixture, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={fixture.league.logo}
                        alt={fixture.league.name}
                        width={24}
                        height={24}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                      <span className="text-sm">{fixture.league.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarIcon size={16} />
                      {new Date(fixture.fixture.date).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={fixture.teams.home.logo}
                        alt={fixture.teams.home.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                      <span className="font-medium">{fixture.teams.home.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">
                        {fixture.goals.home} - {fixture.goals.away}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{fixture.teams.away.name}</span>
                      <Image
                        src={fixture.teams.away.logo}
                        alt={fixture.teams.away.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="space-y-4">
            {fixtures.upcoming.map((fixture, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={fixture.league.logo}
                        alt={fixture.league.name}
                        width={24}
                        height={24}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                      <span className="text-sm">{fixture.league.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarIcon size={16} />
                      {new Date(fixture.fixture.date).toLocaleDateString('it-IT')}
                      <ClockIcon size={16} />
                      {new Date(fixture.fixture.date).toLocaleTimeString('it-IT', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={fixture.teams.home.logo}
                        alt={fixture.teams.home.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                      <span className="font-medium">{fixture.teams.home.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-bold">VS</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{fixture.teams.away.name}</span>
                      <Image
                        src={fixture.teams.away.logo}
                        alt={fixture.teams.away.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={config.blurDataUrlAPISort}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 