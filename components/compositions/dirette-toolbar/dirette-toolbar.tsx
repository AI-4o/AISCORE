'use client'
import InputSelect from 'components/custom/inputs/input-select';
import './style.css'
import { formatDateWithDay, getNextWeekDate, getLastWeekDate, getDateRange } from 'utils'
import { ChangeEvent } from 'react';

interface DiretteToolbarConfig {
    onDateChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function DiretteToolbar({onDateChange}: DiretteToolbarConfig) {

    const selectDatesOptions = getDateRange(getLastWeekDate(), getNextWeekDate()).map((date: string) => ({ 
        value: date, 
        name: formatDateWithDay(date),
        element: <div>{formatDateWithDay(date)}</div>
    }))
    const todayDate = selectDatesOptions.find(opt => formatDateWithDay(opt.value) === 'oggi');

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
                </div>
            </div>
        </div>
    );
}