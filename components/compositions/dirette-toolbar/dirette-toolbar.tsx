'use client'
import InputSelect from 'components/custom/inputs/input-select';
import './style.css'
import { formatDateWithDayName, getNextWeekDate, getLastWeekDate, getDateRange } from 'utils'
import { ChangeEvent, useState } from 'react';
import { Button } from 'ui/button';

interface DiretteToolbarConfig {
    onDateChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    onShowFavoritesChange: (showFavorites: boolean) => void
}

export default function DiretteToolbar({onDateChange, onShowFavoritesChange}: DiretteToolbarConfig) {

    const selectDatesOptions = getDateRange(getLastWeekDate(), getNextWeekDate()).map((date: string) => ({ 
        value: date, 
        name: formatDateWithDayName(date),
        element: <div>{formatDateWithDayName(date)}</div>
    }))
    const todayDate = selectDatesOptions.find(opt => formatDateWithDayName(opt.value) === 'oggi');

    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    const toggleShowFavorites = () => {
        const newShowFavorites = !showFavorites;
        setShowFavorites(newShowFavorites);
        onShowFavoritesChange(newShowFavorites);
    }

    return (
        <div className="dirette-toolbar">
            <div className="flex items-center gap-2">
                <div>Dirette</div>
                <div className='flex items-center justify-center'>
                    <InputSelect
                        value = {todayDate?.value}
                        name="dates-select"
                        options={selectDatesOptions}
                        onChange={onDateChange}
                        hasIncrementBtns={true}
                    />
                    <Button 
                        onClick={toggleShowFavorites}
                        variant="outline"
                        className="bg-secondary-football hover:bg-primary-football text-white font-bold"
                    >
                        {showFavorites ? 'TUTTI' : 'PREFERITI'}
                    </Button>
                </div>
            </div>
        </div>
    );
}