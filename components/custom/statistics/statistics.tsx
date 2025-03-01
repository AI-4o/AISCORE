'use client';

import StatisticRow from "./statistic-row/statistic-row";
import './style.css';

export type SingleStatistic = {
    value: number | string;
    type: string;
}
export default function Statistics({statisticsA, statisticsB}: {statisticsA: SingleStatistic[], statisticsB: SingleStatistic[]}) {

    const statistics = [] as { value1: string | number; value2: string | number; type: string }[];
    for(let i = 0; i < Math.min(statisticsA.length, statisticsB.length); i++) {
        statistics.push({
            value1: statisticsA[i].value,
            value2: statisticsB[i].value,
            type: statisticsA[i].type
        });
    }
    return (
        <div>
            <div className="statistics-list max-h-[60vh] overflow-y-auto no-scrollbar">
                {statistics.map((statistic) => (
                    <StatisticRow key={statistic.type} value1={statistic.value1} value2={statistic.value2} type={statistic.type} />
                ))}
            </div>
        </div>
    );
}