/**
 * StatisticRow Component
 * 
 * Displays a single statistic comparison between two values with a visual bar representation.
 * Used within the Statistics component to show individual metrics.
 * 
 * Features:
 * - Calculates and displays relative percentages between two values
 * - Renders a visual progress bar showing the proportion between values
 * - Handles edge cases (e.g., when both values are zero)
 * - Displays the statistic type label
 * - Shows the actual values on either side of the bar
 */
export type Statistic = {
    value1: number | string;
    value2: number | string;
    type: string;
}
export default function StatisticRow(statistic: Statistic) {

    const calculatePercentages = (n: number | string, m: number | string): [number, number] => {
        // Convert string percentages to numbers
        const val1 = typeof n === 'string' ? parseFloat(n) : n;
        const val2 = typeof m === 'string' ? parseFloat(m) : m;
        
        // Handle edge case where both values are 0
        if (val1 === 0 && val2 === 0) return [50, 50];
        
        const sum = val1 + val2;
        const percent1 = (val1 / sum) * 100;
        const percent2 = (val2 / sum) * 100;
        
        return [percent1, percent2];
    }

    const [percent1, percent2] = calculatePercentages(statistic.value1, statistic.value2);
    
    return (
        <div className="my-6">
            <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm">{statistic.value1}</span>
                    <span className="text-sm font-medium">{statistic.type}</span>
                    <span className="text-sm">{statistic.value2}</span>
                </div>
                <div className="flex gap-1">
                    <input 
                        type="range"
                        value={percent1}
                        max={100}
                        className="w-full appearance-none bg-gray-200 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:hidden [&::-moz-range-track]:h-2 [&::-moz-range-thumb]:hidden"
                        style={{background: `linear-gradient(to right, #34d399 0%, #34d399 ${percent1}%, #e5e7eb ${percent1}%, #e5e7eb 100%)`}}
                        disabled
                    />
                    <input
                        type="range" 
                        value={percent2}
                        max={100}
                        className="w-full appearance-none bg-gray-200 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:hidden [&::-moz-range-track]:h-2 [&::-moz-range-thumb]:hidden"
                        style={{background: `linear-gradient(to right, #fb923c 0%, #fb923c ${percent2}%, #e5e7eb ${percent2}%, #e5e7eb 100%)`}}
                        disabled
                    />
                </div>
            </div>
        </div>
    )
}