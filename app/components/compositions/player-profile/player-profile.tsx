import { Player } from "@/app/api/api-football/models/footballModels";
import Image from "next/image";
import { config } from "appConfig";
import { CalendarIcon, MapPinIcon, RulerIcon, ScaleIcon } from "lucide-react";

interface PlayerProfileProps {
  player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        {/* Foto del giocatore */}
        <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
          <Image
            src={player.photo}
            alt={player.name}
            width={250}
            height={250}
            className="api_football_photo_xl object-cover rounded"
            loading="lazy"
            placeholder="blur"
            blurDataURL={config.blurDataUrlAPISort}
          />
        </div>
        
        {/* Informazioni personali */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Data di nascita</p>
                <p>{player.birth.date} ({player.age} anni)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nazionalità</p>
                <p>{player.nationality}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <RulerIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Altezza</p>
                <p>{player.height}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ScaleIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Peso</p>
                <p>{player.weight}</p>
              </div>
            </div>
          </div>
          
          {player.injured && (
            <div className="mt-4 bg-red-100 p-2 rounded text-red-700 inline-block">
              <p className="text-sm font-semibold">Infortunato</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 