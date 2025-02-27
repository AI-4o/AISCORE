import { PlayerTransfer } from "@/app/api/api-football/models/footballModels";
import Image from "next/image";
import { config } from "appConfig";

interface PlayerTransfersProps {
  transfers: PlayerTransfer;
}

export default function PlayerTransfers({ transfers }: PlayerTransfersProps) {
  if (!transfers || !transfers.transfers || transfers.transfers.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Nessun trasferimento disponibile per questo giocatore.</p>
      </div>
    );
  }

  // Ordina i trasferimenti dal più recente al più vecchio
  const sortedTransfers = [...transfers.transfers].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Storia dei trasferimenti</h2>
      
      <div className="relative">
        {/* Linea verticale che collega tutti i trasferimenti */}
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-300"></div>
        
        {sortedTransfers.map((transfer, index) => {
          // Formatta la data in formato leggibile
          const transferDate = new Date(transfer.date);
          const formattedDate = new Intl.DateTimeFormat('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(transferDate);
          
          return (
            <div key={index} className="flex items-start mb-6 relative">
              {/* Punto sulla linea verticale */}
              <div className="bg-primary h-3 w-3 rounded-full mt-2 z-10"></div>
              
              <div className="ml-6 bg-white shadow-md rounded-lg p-4 w-full">
                <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={transfer.teams.out.logo}
                      alt={transfer.teams.out.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={config.blurDataUrlAPISort}
                      className="object-contain"
                    />
                    <span>{transfer.teams.out.name}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                      {transfer.type === 'Free' ? 'Gratuito' : 
                       transfer.type === 'Loan' ? 'Prestito' : 
                       transfer.type === 'Permanent' ? 'Definitivo' : transfer.type}
                    </div>
                    <div className="text-2xl my-1">→</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Image
                      src={transfer.teams.in.logo}
                      alt={transfer.teams.in.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={config.blurDataUrlAPISort}
                      className="object-contain"
                    />
                    <span>{transfer.teams.in.name}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 