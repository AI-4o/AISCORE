import { PlayerStatistics } from "@/app/api/api-football/models/footballModels";
import Image from "next/image";
import { config } from "appConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

interface PlayerStatsProps {
  stats: PlayerStatistics[];
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
  if (!stats.length) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Nessuna statistica disponibile per questo giocatore.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Statistiche della stagione</h2>
      
      <Tabs defaultValue={stats[0].statistics[0]?.league.id.toString()} className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          {stats[0].statistics.map((stat) => (
            <TabsTrigger 
              key={stat.league.id} 
              value={stat.league.id.toString()}
              className="flex items-center gap-2"
            >
              <Image
                src={stat.league.logo}
                alt={stat.league.name}
                width={20}
                height={20}
                loading="lazy"
                placeholder="blur"
                blurDataURL={config.blurDataUrlAPISort}
              />
              {stat.league.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {stats[0].statistics.map((stat) => (
          <TabsContent key={stat.league.id} value={stat.league.id.toString()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Presenze e ruolo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image
                      src={stat.team.logo}
                      alt={stat.team.name}
                      width={20}
                      height={20}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={config.blurDataUrlAPISort}
                    />
                    {stat.team.name}
                  </CardTitle>
                  <CardDescription>Presenze e ruolo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Partite</span>
                    <span className="font-semibold">{stat.games.appearences || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Titolare</span>
                    <span className="font-semibold">{stat.games.lineups || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minuti</span>
                    <span className="font-semibold">{stat.games.minutes || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posizione</span>
                    <span className="font-semibold">{stat.games.position || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="font-semibold">{stat.games.rating || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Gol e assist */}
              <Card>
                <CardHeader>
                  <CardTitle>Gol e assist</CardTitle>
                  <CardDescription>Realizzazioni e contributi offensivi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gol</span>
                    <span className="font-semibold">{stat.goals.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assist</span>
                    <span className="font-semibold">{stat.goals.assists || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiri totali</span>
                    <span className="font-semibold">{stat.shots.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiri in porta</span>
                    <span className="font-semibold">{stat.shots.on || 0}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Passaggi */}
              <Card>
                <CardHeader>
                  <CardTitle>Passaggi</CardTitle>
                  <CardDescription>Statistiche sui passaggi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Totali</span>
                    <span className="font-semibold">{stat.passes.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passaggi chiave</span>
                    <span className="font-semibold">{stat.passes.key || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precisione</span>
                    <span className="font-semibold">{stat.passes.accuracy || 0}%</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Difesa */}
              <Card>
                <CardHeader>
                  <CardTitle>Difesa</CardTitle>
                  <CardDescription>Statistiche difensive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tackle</span>
                    <span className="font-semibold">{stat.tackles.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intercetti</span>
                    <span className="font-semibold">{stat.tackles.interceptions || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blocchi</span>
                    <span className="font-semibold">{stat.tackles.blocks || 0}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Cartellini */}
              <Card>
                <CardHeader>
                  <CardTitle>Disciplina</CardTitle>
                  <CardDescription>Cartellini e falli</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gialli</span>
                    <span className="font-semibold">{stat.cards.yellow || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rossi</span>
                    <span className="font-semibold">{stat.cards.red || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doppi gialli</span>
                    <span className="font-semibold">{stat.cards.yellowred || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Falli commessi</span>
                    <span className="font-semibold">{stat.fouls.committed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Falli subiti</span>
                    <span className="font-semibold">{stat.fouls.drawn || 0}</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sostituzioni */}
              <Card>
                <CardHeader>
                  <CardTitle>Sostituzioni</CardTitle>
                  <CardDescription>Entrate e uscite dal campo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Entrato</span>
                    <span className="font-semibold">{stat.substitutes.in || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uscito</span>
                    <span className="font-semibold">{stat.substitutes.out || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In panchina</span>
                    <span className="font-semibold">{stat.substitutes.bench || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 