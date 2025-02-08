"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"
import './dirette-table.css'
import DirettaRow from "../diretta-row/diretta-row"
import { useAppSelector, useAppDispatch } from "store/hooks"
import { fetchFixtures, toggleFavoriteLeague } from "store/features/fixtures/fixturesSlice"
import { useEffect, useState } from "react"
import Spinner from "components/custom/spinner/spinner"
import { setIsActiveSpinner, setIsInactiveSpinner } from "store/features/spinner/spinnerSlice"
import { config } from "appConfig"
import { getDiretteTableData } from "store/features/fixtures/utils"
import Image from "next/image"
import DiretteToolbar from "../dirette-toolbar/dirette-toolbar"
import { getTodayDate } from "utils"
import { getAPIFootballParams } from "api/api-football/api-call.defs"
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon"

export function DiretteTable(p: getAPIFootballParams) {

  const dispatch = useAppDispatch();

  // day to show in the table, set by the toolbar select
  const [dayToShow, setDayToShow] = useState<string>(getTodayDate());

  const leagueFixtures = useAppSelector((state) => getDiretteTableData(state.football.fixtures, dayToShow)); // got from the store
  const isFavoriteLeague = useAppSelector((state) =>
    new Map(state.football.leagues.map(
      (league) => {
        return [league.id, league.isFavorite]
      }
    ))
  );
  useEffect(() => {
    dispatch(setIsActiveSpinner());
    dispatch(fetchFixtures(p)); // TODO: set parallel fetching
    return () => {
      dispatch(setIsInactiveSpinner());
    }
  }, []);

  useEffect(() => {
    // Disable spinner when dirette changes
    if (leagueFixtures.length > 0) {
      dispatch(setIsInactiveSpinner());
    }
  }, [leagueFixtures, dispatch]);

  // DEBUG
  useEffect(() => {
    (window as any).leagueFixtures = leagueFixtures
  }, [leagueFixtures, dayToShow])

  return (
    <div className="dirette-table w-full bg-secondary-football">
      <Spinner src={config.spinner}>
        <DiretteToolbar onDateChange={(e) => setDayToShow(e.target.value)} />
        <div className="dirette-table-content">
          <Accordion type="single" collapsible className="w-full">
            {leagueFixtures.length > 0 && leagueFixtures.slice(0, config.pagination).map((fxt, index) => {

              const league = fxt.league;

              return (
                <AccordionItem className="dirette-table-accordion-item" key={index} value={`item-${index + 1}`}>
                  <div className="flex w-full gap-4 accordion-trigger-wrapper">
                    <PreferitiIcon
                      onSelected={(selected) => {
                        dispatch(toggleFavoriteLeague(league.id));
                        console.log("table: ", league.id, isFavoriteLeague.get(league.id));
                      }}
                      selected={isFavoriteLeague.get(league.id)}
                    />
                    <AccordionTrigger className="dirette-table-accordion-trigger">
                      <div className="flex items-center gap-4">
                        <Image
                          src={league.logo}
                          alt={league.name}
                          width={20}
                          height={20}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={config.blurDataUrlAPISort}
                        />
                        <b>{league.name.toUpperCase()} {isFavoriteLeague.get(league.id)}</b>
                      </div>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="dirette-table-accordion-content">
                    {fxt.fixtures.map((fixture, index) => (
                      <DirettaRow key={index} {...fixture} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            }
            )}
          </Accordion>
        </div>
      </Spinner>
    </div>

  )
}