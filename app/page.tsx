//import WidgetExample from "components/custom/widget-wrappers/widget-example";
"use client"
import { DiretteTable } from "../components/compositions/dirette-table/dirette-table";
import { DataType, getAPIFootballParams } from "../app/api/api-football/utils";
import { getLastWeekDate, getTodayDate, getDateRange } from "utils";
import { sendEmail } from "actions";

export default function Home() {



  const fixtureParams: getAPIFootballParams & {dateRange: string[]} = {
    dataName: DataType.FIXTURES,
    queryParams: {},
    dateRange: getDateRange(getLastWeekDate(), getTodayDate()),
    writeMock: false,
    mockCall: false 
  }

  console.log(new Date().toISOString());
  const _sendEmail = async () => {
    const response = await sendEmail();
    console.log(response);
  }

  return (
    <>
      {/* Il tradizionale markup in React */}
      <div className="flex flex-col items-center">
        <h1>WINPRO - home</h1>
        <div className="w-full flex justify-center mt-5">
          {/* <WidgetExample active={true} /> */}
            <DiretteTable {...fixtureParams} />
        </div>
      </div>
    </>
  );
}

/**
 
   const [dateRange, setDateRange] = useState(getDateRange(getLastWeekDate(), getTodayDate()));

  useEffect(() => {
    // Calculate milliseconds until next midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set initial timeout to trigger at midnight
    const timeout = setTimeout(() => {
      setDateRange(getDateRange(getLastWeekDate(), getTodayDate()));
      
      // Then set interval to run daily at midnight
      const interval = setInterval(() => {
        setDateRange(getDateRange(getLastWeekDate(), getTodayDate()));
      }, 24 * 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilMidnight);

    // Cleanup dell'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, []); 
  
 */