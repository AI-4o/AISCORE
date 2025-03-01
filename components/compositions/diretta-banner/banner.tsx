"use client";
/**
 * MatchBanner Component
 * 
 * Displays a comprehensive header banner for a football match.
 * Used as the main visual component at the top of match detail views.
 * 
 * Features:
 * - Shows league information and logo
 * - Displays match status with semantic colors
 * - Presents both teams with logos and names
 * - Shows current score
 * - Responsive design adaptable to different screen sizes
 * - Updates dynamically when fixture data changes
 */
// components/compositions/diretta-banner/banner?.tsx
import { FavoriteFixture } from "@/app/api/api-football/models/footballModels";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function MatchBanner({ fixture }: { fixture: FavoriteFixture }) {
  const [_fixture, setFixture] = useState<FavoriteFixture>(fixture);
  useEffect(() => {
    console.log("lkjhgfds", fixture);
    setFixture(fixture);
  }, [fixture]);
  return (
    <div className="w-full flex flex-col">
      {/* Header partita - senza background, prende lo spazio disponibile */}
      <div className="text-foreground w-full p-3">
        <div className="w-full">
          <div>
            <Image
              height={56}
              width={56}
              src={fixture.league?.logo}
              alt={"league logo"}
              className="w-14 h-14"
            />
          </div>
          <div className="text-center text-xs text-muted-foreground mb-1">
            {fixture.league?.name} • {fixture.league?.round}
          </div>

          {/* Stato partita - usa colori semantici */}
          <div className="text-center text-emerald-500 font-medium text-sm mb-2">
            {fixture.fixture?.status?.long ?? fixture.fixture?.status?.short}
          </div>
          {/* Teams e risultato - layout più spazioso per un contenitore ampio */}
          <div className="flex justify-between items-center py-4 px-6">
            <div className="flex-1 text-right pr-6">
              <div className="text-base font-bold">
                {fixture.teams?.home?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                inserire citta
              </div>
            </div>

            <div className="flex items-center justify-center px-4">
              <div className="h-14 w-14 relative mr-4 flex-shrink-0">
                <div className="absolute p-3 inset-0 bg-white rounded-lg flex items-center justify-center text-white font-bold">
                  <Image
                    height={56}
                    width={56}
                    src={fixture.teams?.home?.logo}
                    alt={"home team logo"}
                    className="w-14 h-14"
                  />
                </div>
              </div>

              <div className="px-3 py-1 bg-accent rounded">
                <span className="text-xl font-bold">
                  {fixture.score?.fulltime?.home ?? "-"}:
                  {fixture.score?.fulltime?.away ?? "-"}
                </span>
              </div>

              <div className="h-14 w-14 relative ml-4 flex-shrink-0">
                <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center text-white font-bold">
                  <Image
                    height={56}
                    width={56}
                    src={fixture.teams?.away?.logo}
                    alt={"away team logo"}
                    className="w-14 h-14"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 text-left pl-6">
              <div className="text-base font-bold">
                {fixture.teams?.away?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                inserire citta
              </div>
            </div>
          </div>

          {/* Data e ora - più compatta */}
          <div className="text-center mt-2 text-xs text-muted-foreground">
            {fixture.fixture?.date.split("T")[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
