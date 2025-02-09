"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import "./dirette-table.css";
import DirettaRow from "../diretta-row/diretta-row";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  fetchFixtures,
  getFavouriteLeagueFixtures,
  selectLeagueFixturesByDay,
  toggleFavoriteLeague,
} from "store/features/fixtures/fixturesSlice";
import { useEffect, useState } from "react";
import Spinner from "components/custom/spinner/spinner";
import {
  setIsActiveSpinner,
  setIsInactiveSpinner,
} from "store/features/spinner/spinnerSlice";
import { config } from "appConfig";
import Image from "next/image";
import DiretteToolbar from "../dirette-toolbar/dirette-toolbar";
import { getAPIFootballParams } from "api/api-football/api-call.defs";
import PreferitiIcon from "components/custom/preferiti-icon/preferiti-icon";

export function DiretteTable(p: getAPIFootballParams) {
  const dispatch = useAppDispatch();

  // day to show in the table, set by the toolbar select
  const [dayToShow, setDayToShow] = useState<Date>(new Date());
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [openAccordionsVls, setOpenAccordionsVls] = useState<string[]>(
    Array.from({ length: 4 }, (_, i) => `${i + 1}`)
  );

  // Funzione per aprire accordion specifici
  const toggleAccordion = (index: number) => {
    const accordionVl = `${index + 1}`;
    const values = openAccordionsVls.includes(accordionVl)
      ? openAccordionsVls.filter((vl) => vl !== accordionVl)
      : [...openAccordionsVls, accordionVl];
    setOpenAccordionsVls(values);
  }; 

  // get the leagueFixtures of the day, filtered also by favorite if showFavorites is true
  const leagueFixturesOfDay = useAppSelector((state) => {
    const lfs = selectLeagueFixturesByDay(state.football, dayToShow);
    if (showFavorites) return getFavouriteLeagueFixtures(lfs);
    return lfs;
  });
  const leagueFixtures = useAppSelector((state) => state.football.leaguesFixtures);
  const fixtures = useAppSelector((state) => state.football.fixtures);

  useEffect(() => {
    dispatch(setIsActiveSpinner());
    dispatch(fetchFixtures(p));
    return () => {
      dispatch(setIsInactiveSpinner());
    };
  }, []);

  useEffect(() => {
    // Disable spinner when dirette changes
    dispatch(setIsInactiveSpinner());
  }, [leagueFixturesOfDay, dispatch]);

  // DEBUG
  useEffect(() => {
    (window as any).leagueFixturesOfDay = leagueFixturesOfDay;
    (window as any).leagueFixtures = leagueFixtures;
    (window as any).fixtures = fixtures;

  }, [leagueFixturesOfDay, dayToShow, leagueFixtures, fixtures]);

  return (
    <div className="dirette-table w-full bg-secondary-football">
      <Spinner src={config.spinner}>
        <DiretteToolbar
          onDateChange={(e) => setDayToShow(new Date(e.target.value))}
          onShowFavoritesChange={(e) => setShowFavorites(e)}
        />
        <div className="dirette-table-content">
          <Accordion
            type="multiple"
            className="w-full"
            value={openAccordionsVls}
          >
            {/* caso in cui non ci sono partite nel tale gg*/}
            {leagueFixturesOfDay.length === 0 && !showFavorites && (
              <div className="dirette-table-no-fixtures flex flex-col items-center justify-center gap-4 py-12 px-4">
                <h2 className="text-2xl font-bold">Non ci sono partite oggi 🥲</h2>
              </div>
            )}
            {/* caso in cui non ci sono partite preferite nel tale gg e showFavorites */}
            {leagueFixturesOfDay.length === 0 && showFavorites && (
              <div className="dirette-table-no-fixtures flex flex-col items-center justify-center gap-4 py-12 px-4">
                <h2 className="text-2xl font-bold">Aggiungi i tuoi preferiti</h2>
                <p className="text-sm text-muted-foreground">Tutte le partite importanti in un unico posto.</p>
              </div>
            )}
            {/* caso in cui ci sono partite */}
            {leagueFixturesOfDay.length > 0 &&
              leagueFixturesOfDay
                .slice(0, config.pagination)
                .map((fxt, index) => {
                  return (
                    <AccordionItem
                      className="dirette-table-accordion-item"
                      key={index}
                      value={`${index + 1}`}
                    >
                      <div className="flex w-full gap-4 accordion-trigger-wrapper">
                        <PreferitiIcon
                          onSelected={(selected) =>
                            dispatch(toggleFavoriteLeague(fxt.league.id))
                          }
                          selected={fxt.league.isFavorite}
                        />
                        <AccordionTrigger
                          className="dirette-table-accordion-trigger"
                          onClick={() => toggleAccordion(index) }
                        >
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

                            <b>
                              {fxt.league.name.toUpperCase()}
                            </b>
                          </div>
                        </AccordionTrigger>
                      </div>
                      <AccordionContent className="dirette-table-accordion-content">
                        {fxt.fixtures.map((fixture, index) => (
                          <DirettaRow key={index} {...fixture} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
          </Accordion>
        </div>
      </Spinner>
    </div>
  );
}