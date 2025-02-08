"use client"
import { Fixture } from "api/api-football/models/fixture";
import './diretta-row.css'
import { config } from 'appConfig';
import Image from 'next/image';
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon";
import { extractTimeFromISO } from "app/lib/utils";
import { toggleFavoriteFixture } from "store/features/fixtures/fixturesSlice";
import { useAppSelector, useAppDispatch } from "store/hooks"

export default function DirettaRow(fixture: Fixture) {

    const dispatch = useAppDispatch();

    const _fixture = fixture.fixture;
    const isFavoriteFixture = useAppSelector((state) => state.football.fixtures.find((f) => f.fixture.id === _fixture.id)?.isFavorite);
    const isFavoriteLeague = useAppSelector((state) => state.football.leagues.find((l) => l.id === fixture.league.id)?.isFavorite);
    const onClickStarBtn = () => {
        dispatch(toggleFavoriteFixture(_fixture.id));
        console.log("row: ", fixture.league.id, isFavoriteLeague);
    }

    return (
        <div className="diretta-row grid items-center" style={{ gridTemplateColumns: '5% 10% 30% 10% 30% 15%' }}>
            <PreferitiIcon onSelected={onClickStarBtn} selected={isFavoriteFixture} />
            <div className="text-center">
                <b>{extractTimeFromISO(_fixture.date)}</b>
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
                {_fixture.status.short === 'NS' && <p>preview</p>}
            </div>
        </div>
    );
}