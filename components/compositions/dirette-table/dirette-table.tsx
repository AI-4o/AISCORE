"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"
import './dirette-table.css'
import DirettaRow from "../diretta-row/diretta-row"
import { Fixture } from "api/api-football/models/fixture"
import { useAppSelector, useAppDispatch } from "store/hooks"
import { fetchFixtures } from "store/features/fixtures/fixturesSlice"
import { getAPIFootballParams } from "api/api-football/utils"
import { useEffect, useState } from "react"
import Spinner from "components/custom/spinner/spinner"
import { setIsActiveSpinner, setIsInactiveSpinner } from "store/features/spinner/spinnerSlice"
import { config } from "appConfig"
import { getDiretteTableData } from "store/features/fixtures/utils"
import Image from "next/image"
import DiretteToolbar from "../dirette-toolbar/dirette-toolbar"
import { getLastWeekDate, getNextWeekDate, getTodayDate } from "utils"
import { getDateRange } from "utils"

export type DiretteGroup = {
  header: React.ReactNode, // diretta.it -> bandieraNazione, nomeNazione, nomeLega
  rows: Fixture[]
}

export function DiretteTable(paramsWithDRange: getAPIFootballParams & {dateRange: string[]}) {

  const dispatch = useAppDispatch();
  const dateRange = getDateRange(getLastWeekDate(), getNextWeekDate()); // get +- 7 days range for the api request
  const [dayToShow, setDayToShow] = useState<string>(getTodayDate()); // day to show in the table, set by the toolbar select
  const leagueFixtures = useAppSelector((state) => getDiretteTableData(state.fixtures.fixtures, {dateRange: [dayToShow]})); // got from the store
  useEffect(() => {
    dispatch(setIsActiveSpinner());
    if(paramsWithDRange.dateRange.length > 0) { // date range provided -> do multiple api calls
      const {dateRange, ...params} = paramsWithDRange;
      for(const date of dateRange) {
        dispatch(fetchFixtures({...params, queryParams: {...params.queryParams, date: date}}));
      }
    } else { // no date range, just perform the api call
      dispatch(fetchFixtures(paramsWithDRange));
    }
    return () => {
      dispatch(setIsInactiveSpinner());
    }
  }, []);

  useEffect(() => {
    // Disable spinner when dirette changes
    setTimeout(() => { // TODO: remove setTimeout in production
      if (leagueFixtures.length > 0) {
        dispatch(setIsInactiveSpinner());
      }
    }, 1000);
  }, [leagueFixtures, dispatch]);

  return (
    <div className="dirette-table w-full bg-secondary-football">
      <Spinner src={config.spinner}>
        <DiretteToolbar dateRange={dateRange} onDateChange={(e) => setDayToShow(e.target.value)} />
        <div className="dirette-table-content">
        <Accordion type="single" collapsible className="w-full">
          {leagueFixtures.length > 0 && leagueFixtures.slice(0, 10).map((leagueFixture, index) => (
            <AccordionItem className="dirette-table-accordion-item" key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="dirette-table-accordion-trigger">
                <div className="flex items-center gap-2">
                  <Image
                    src={leagueFixture.league.logo}
                    alt={leagueFixture.league.name}
                    width={20}
                    height={20}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={config.blurDataUrlAPISort}
                  />
                  {leagueFixture.league.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="dirette-table-accordion-content">
                {leagueFixture.fixtures.map((fixture, index) => (
                  <DirettaRow key={index} {...fixture} />
                ))}
              </AccordionContent>
            </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Spinner>
    </div>

  )
}