"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchPlayerData } from "@/app/store/features/players/playersSlice";
import { toggleDialog } from "@/app/store/features/dialog/dialogSlice";
import PlayerProfile from "@/app/components/compositions/player-profile/player-profile";
import PlayerStats from "@/app/components/compositions/player-stats/player-stats";
import PlayerTransfers from "@/app/components/compositions/player-transfers/player-transfers";
import PlayerGames from "@/app/components/compositions/player-games/player-games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

interface PlayerPageProps {
  params: {
    id: string;
  };
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const dispatch = useAppDispatch();
  const playerId = parseInt(params.id, 10);

  return <div>Player Page</div>;
  /*
  const playerInfo = useAppSelector((state) => state.player.playerInfo);
  const playerStats = useAppSelector((state) => state.player.playerStats);
  const playerTransfers = useAppSelector((state) => state.player.playerTransfers);
  const status = useAppSelector((state) => state.player.status);
  const error = useAppSelector((state) => state.player.error);
  
  useEffect(() => {
    dispatch(toggleDialog({ isSpinner: true }));
    dispatch(fetchPlayerData({ playerId }));
    
    return () => {
      dispatch(toggleDialog({}));
    };
  }, [dispatch, playerId]);

  const isLoading = status === "loading";
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Si è verificato un errore durante il caricamento dei dati del giocatore.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 bg-secondary-football">
      <div className="mb-6">
        {playerInfo && <PlayerProfile player={playerInfo} />}
      </div>
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="stats" className="flex-1">Statistiche</TabsTrigger>
          <TabsTrigger value="games" className="flex-1">Partite</TabsTrigger>
          <TabsTrigger value="transfers" className="flex-1">Trasferimenti</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats">
          {playerStats && <PlayerStats stats={playerStats} />}
        </TabsContent>
        
        <TabsContent value="games">
          {playerInfo && <PlayerGames playerId={playerInfo.id} />}
        </TabsContent>
        
        <TabsContent value="transfers">
          {playerTransfers && <PlayerTransfers transfers={playerTransfers} />}
        </TabsContent>
      </Tabs>
    </div>
  );*/
} 