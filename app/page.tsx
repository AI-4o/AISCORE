"use client"
import { DiretteTable } from "../components/compositions/dirette-table/dirette-table";
import { DataType, getAPIFootballParams } from "api/api-football/api-call.defs";

export default function Home() {
  const fixtureParams: getAPIFootballParams = {
    dataName: DataType.FIXTURES,
    queryParams: {} // other params for fixtures are set at slice level
  }

  return (
    <>
      {/* Il tradizionale markup in React */}
      <div className="flex w-full flex-col items-center">
        <h1>WINPRO - home</h1>
        <div className="w-full flex justify-center mt-5">
          {/* <WidgetExample active={true} /> */}
          <DiretteTable {...fixtureParams} />
        </div>
      </div>
    </>
  );
}