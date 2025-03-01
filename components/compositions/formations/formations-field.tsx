"use client";

import React, { useState, useEffect } from "react";
import {
  FavoriteFixture,
  Lineup,
} from "@/app/api/api-football/models/footballModels";
import Image from "next/image";

export default function FormationsField({ f }: { f: FavoriteFixture }) {
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [lineupJSXHome, setLineupJSXHome] = useState<JSX.Element | null>(null);
  const [lineupJSXAway, setLineupJSXAway] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const fetchLineups = async () => {
      const response = await fetch(
        `/api/api-football/lineups?fixtureId=${f.fixture.id}`
      );
      const data = await response.json();
      setLineups(data.lineups);
      setLineupJSXHome(await lineupGrid(data.lineups[0]));
      setLineupJSXAway(await lineupGrid(data.lineups[1]));
    };
    fetchLineups();
  }, []);


  useEffect(() => {   // DEBUG
    (window as any).lineups = lineups;
  }, [lineups]);

  useEffect(() => {   // DEBUG
    (window as any).lineupJSXHome = lineupJSXHome;
  }, [lineupJSXHome]);

  useEffect(() => {   // DEBUG
    (window as any).lineupJSXAway = lineupJSXAway;
  }, [lineupJSXAway]);
  
  

  return (
    <div>
      <Image
        src={"/soccer-field.png"}
        alt="soccer-field image"
        width={800}
        height={800}
      />

      <div className="flex flex-row">
        {lineupJSXHome}
        {lineupJSXAway}
      </div>
    </div>
  );
}

const getLineupSchema = (l: Lineup): number[] =>
  l.formation.split("-").map(Number);

const getCompleteLineup = async (l: Lineup) => {
  return await Promise.all(
    l.startXI.map(async (p) => {
      const [x, y] = p.player.grid?.split(":") ?? [0, 0];
      const playerProfile = fetch(
        `/api/api-football/player-profile?id=${p.player.id}`
      );
      return playerProfile
        .then((p) => p.json())
        .then((p) => ({
          x: x,
          y: y,
          playerProfile: p,
        }));
    })
  );
};

/**
 * get the grid of the formation for a team,
 * @param s the schema of a team extracted from the getLineupsSchemas function return value
 * @param l the Lineup of the team
 * @returns the JSX for the formation grid of the team
 */
export const lineupGrid = async (l: Lineup) => {
  const completeLineup = await getCompleteLineup(l);
  console.log(completeLineup);
  
  const schema = getLineupSchema(l);
  /**
   * get the players for the given column
   * @param x the column number
   * @returns array of the form {y:y, player:Player}[]
   */
  const playersColumns = (x: number) => {
    const c = completeLineup.filter((p) => (p.x).toString() == x.toString());
    console.log("x", x, c);
    return c;
  };

  return (
    <div className="flex flex-row">
      {schema.map((_, i) => {
        return (
          <div key={i} className="w-10 h-10 bg-red-500 flex flex-col">
            {playersColumns(i + 1).map((p, j) => (
              <div key={j} className="w-10 h-10 gap-2 bg-blue-500 flex flex-col">
                <Image
                  src={p.playerProfile.response[0].player.photo}
                  alt={p.playerProfile.response[0].player.name + " photo"}
                  width={100}
                  height={100}
                />
                {p.playerProfile.response[0].player.name}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
