'use client'
import InputSelect from 'components/custom/inputs/input-select';
import './style.css'
import { formatDateWithDay } from 'utils'
import { ChangeEvent } from 'react';

interface DiretteToolbarConfig {
    dateRange: string[],
    onDateChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function DiretteToolbar({dateRange, onDateChange}: DiretteToolbarConfig) {


    const selectDatesOptions = dateRange.map(date => ({ 
        value: date, 
        name: formatDateWithDay(date),
        element: <div>{formatDateWithDay(date)}</div>
    }))

    return (
        <div className="dirette-toolbar">
            <div className="flex items-center gap-2">
                <div>Dirette</div>
                <div className='flex items-center justify-center'>
                    <InputSelect
                        name="dates-select"
                        options={selectDatesOptions}
                        onChange={onDateChange}
                    />
                </div>
            </div>
        </div>
    );
}