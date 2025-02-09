"use client";
import { FavoriteFixture } from "@/app/api/api-football/models/footballModels";
import "./diretta-row.css";
import { config } from "appConfig";
import Image from "next/image";
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon";
import { formatDateToHHmm } from "app/lib/utils";
import { toggleFavoriteFixture } from "store/features/fixtures/fixturesSlice";
import { useAppSelector, useAppDispatch } from "store/hooks";

export default function DirettaRow(fixture: FavoriteFixture) {
  const dispatch = useAppDispatch();

  const fixture0 = fixture.fixture;
  const onClickStarBtn = () => {
    dispatch(toggleFavoriteFixture(fixture.fixture.id));
  };

  return (
    <div
      className="diretta-row grid items-center"
      style={{ gridTemplateColumns: "5% 10% 30% 10% 30% 15%" }}
    >
      <PreferitiIcon
        onSelected={onClickStarBtn}
        selected={fixture.isFavorite}
      />

      <div className="text-center">
        <b>{formatDateToHHmm(new Date(new Date(fixture0.date).getTime() + 60 * 60 * 1000).toISOString())}</b>
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
  );
}
