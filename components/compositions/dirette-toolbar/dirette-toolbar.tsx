"use client";
/**
 * DiretteToolbar Component
 * 
 * Toolbar component for the DirectteTable that provides filtering and date selection controls.
 * Allows users to filter matches by date and toggle between all matches and favorites.
 * 
 * Features:
 * - Date selection dropdown to choose which day's matches to display
 * - Favorites toggle button to filter matches by favorite status
 * - Responsive design that works on all device sizes
 * - Provides callbacks for parent components to handle state changes
 * - Pre-selects current day by default
 */
import InputSelect from "components/custom/inputs/input-select";
import "./style.css";
import {
  formatDateWithDayName,
  getNextWeekDate,
  getLastWeekDate,
  getDateRange,
} from "utils";
import { ChangeEvent, useState } from "react";
import { Button } from "ui/button";

interface DiretteToolbarConfig {
  onDateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onShowFavoritesChange: (showFavorites: boolean) => void;
}

export default function DiretteToolbar({ onDateChange, onShowFavoritesChange }: DiretteToolbarConfig) {

  
  const selectDatesOptions = getDateRange(
    getLastWeekDate(),
    getNextWeekDate()
  ).map((date: Date) => ({
    value: date.toISOString(),
    name: formatDateWithDayName(date),
    element: <div>{formatDateWithDayName(date)}</div>,
  }));

  const todayDate = selectDatesOptions.find(
    (o) => o.name === "OGGI",
  );

  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const toggleShowFavorites = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    onShowFavoritesChange(newShowFavorites);
  };

  return (
    <div className="dirette-toolbar">
      <div className="flex items-center gap-5">
        <div>Dirette</div>
        <div className="flex items-center justify-center">
          <InputSelect
            value={todayDate?.value}
            name="dates-select"
            options={selectDatesOptions}
            onChange={onDateChange}
            hasIncrementBtns={true}
          />
          <div className="ml-4">
            <Button
              onClick={toggleShowFavorites}
              variant="outline"
              className="bg-secondary-football hover:bg-primary-football text-white font-bold"
            >
              {showFavorites ? "VEDI TUTTI" : "VEDI PREFERITI"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}