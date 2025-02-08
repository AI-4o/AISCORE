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
import { fetchFixtures, getFavouriteLeagueFixtures, selectLeagueFixturesByDay, toggleFavoriteLeague } from "store/features/fixtures/fixturesSlice"
import { useEffect, useState } from "react"
import Spinner from "components/custom/spinner/spinner"
import { setIsActiveSpinner, setIsInactiveSpinner } from "store/features/spinner/spinnerSlice"
import { config } from "appConfig"
import Image from "next/image"
import DiretteToolbar from "../dirette-toolbar/dirette-toolbar"
import { getTodayDate } from "utils"
import { getAPIFootballParams } from "api/api-football/api-call.defs"
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon"

export function DiretteTable(p: getAPIFootballParams) {

  const dispatch = useAppDispatch();

  // day to show in the table, set by the toolbar select
  const [dayToShow, setDayToShow] = useState<string>(getTodayDate());
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // get the leagueFixtures of the day, filtered also by favorite if showFavorites is true
  const leagueFixturesOfDay = useAppSelector((state) => {
    const lfs = selectLeagueFixturesByDay(state.football, dayToShow)
    if (showFavorites) return getFavouriteLeagueFixtures(lfs)
    return lfs;
  })

  useEffect(() => {
    dispatch(setIsActiveSpinner());
    dispatch(fetchFixtures(p));
    return () => {
      dispatch(setIsInactiveSpinner());
    }
  }, []);

  useEffect(() => {
    // Disable spinner when dirette changes
    if (leagueFixturesOfDay.length > 0) {
      dispatch(setIsInactiveSpinner());
    }
  }, [leagueFixturesOfDay, dispatch]);

  // DEBUG
  useEffect(() => {
    (window as any).leagueFixturesOfDay = leagueFixturesOfDay
  }, [leagueFixturesOfDay, dayToShow])

  return (
    <div className="dirette-table w-full bg-secondary-football">
      <Spinner src={config.spinner}>
        <DiretteToolbar onDateChange={(e) => setDayToShow(e.target.value)} onShowFavoritesChange={(e) => setShowFavorites(e)} />
        <div className="dirette-table-content">
          <Accordion type="single" collapsible className="w-full">
            {leagueFixturesOfDay.length > 0 && leagueFixturesOfDay.slice(0, config.pagination).map((fxt, index) => {

              const league = fxt.league;

              return (
                <AccordionItem className="dirette-table-accordion-item" key={index} value={`item-${index + 1}`}>
                  <div className="flex w-full gap-4 accordion-trigger-wrapper">
                    <PreferitiIcon
                      onSelected={(selected) => dispatch(toggleFavoriteLeague(fxt.league.id))}
                      selected={fxt.league.isFavorite}
                    />
                    <AccordionTrigger className="dirette-table-accordion-trigger">
                      <div className="flex items-center gap-4">
                        <Image
                          src={fxt.league.logo}
                          alt={fxt.league.name}
                          width={20}
                          height={20}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={config.blurDataUrlAPISort}
                        />
                        <b>{fxt.league.name.toUpperCase()} {fxt.league.id}</b>
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