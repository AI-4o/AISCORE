"use client";
/**
 * DirettaRow Component
 * 
 * Displays a single football match row within the DiretteTable component.
 * Shows team information, scores, match time, and status.
 * 
 * Features:
 * - Toggleable favorite status for matches
 * - Click interaction to open detailed match view
 * - Displays match time and status
 * - Shows team logos and names
 * - Integrates with Redux store for state management
 */
import { FavoriteFixture } from "@/app/api/api-football/models/footballModels";
import "./diretta-row.css";
import { config } from "appConfig";
import Image from "next/image";
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon";
import { formatDateToHHmm } from "app/lib/utils";
import { toggleFavoriteFixture } from "@/app/store/features/fixtures/footballSlice";
import { useAppDispatch } from "store/hooks";
import { toggleDialog } from "@/app/store/features/dialog/dialogSlice";
import Statistics from "components/custom/statistics/statistics";
import { getExampleStatistics } from "./example";
import MultiView, { View } from "../multi-view/multi-view";
import Banner from "../diretta-banner/banner";

export default function DirettaRow(fixture: FavoriteFixture) {
  const dispatch = useAppDispatch();

  const fixture0 = fixture.fixture;

  // add to favorite
  const onClickStarBtn = () => {
    dispatch(toggleFavoriteFixture(fixture.fixture.id));
  };

  // open fixture detail modal
  const onClickRow = async () => {
    const views: View[] = [
      {
        name: "Statistiche",
        id: "statistics",
        body: (
          <Statistics
            statisticsA={getExampleStatistics()}
            statisticsB={getExampleStatistics()}
          />
        ),
      },
      {
        name: "Formazioni",
        id: "formations",
        body: <div>inserire componente di formazioni</div>,
      },
      {
        name: "Commento",
        id: "comment",
        body: <div>inserire componente di commento</div>,
      },
      {
        name: "Pronostici",
        id: "predictions",
        body: <div>inserire componente di pronostici</div>,
      },
      {
        name: "Riassunto",
        id: "summary",
        body: <div>inserire componente di riassunto</div>,
      },
    ];
    dispatch(
      toggleDialog({
        content: {
          body: (
            <MultiView
              views={views}
              commonBanner={<Banner fixture={fixture} />}
            />
          ),
        },
      })
    );
  };

  return (
    <div className="flex w-full">
      <PreferitiIcon
        onSelected={onClickStarBtn}
        selected={fixture.isFavorite}
      />
      <div
        className="diretta-row grid items-center"
        style={{ gridTemplateColumns: "15% 35% 10% 30% 10% 0%" }}
        onClick={onClickRow}
      >
        <div className="text-center">
          <b>
            {formatDateToHHmm(
              new Date(
                new Date(fixture0.date).getTime() + 60 * 60 * 1000
              ).toISOString()
            )}
          </b>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap overflow-hidden">
          <Image
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            width={20}
            height={20}
            loading="lazy"
            placeholder="blur"
            blurDataURL={config.blurDataUrlAPISort}
          />
          <b className="truncate">{fixture.teams.home.name.toUpperCase()}</b>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>{fixture.goals.home}</p>
          <p>-</p>
          <p>{fixture.goals.away}</p>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap overflow-hidden">
          <Image
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            width={20}
            height={20}
            loading="lazy"
            placeholder="blur"
            blurDataURL={config.blurDataUrlAPISort}
          />
          <b className="truncate">{fixture.teams.away.name.toUpperCase()}</b>
        </div>
        <div className="text-center">
          {fixture0.status.short === "NS" && <p>preview</p>}
        </div>
      </div>
    </div>
  );
}
