"use client";
import { DiretteTable } from "../components/compositions/dirette-table/dirette-table";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1>WINPRO - home</h1>
      <div className="w-full flex justify-center mt-5">
        <DiretteTable />
      </div>
    </div>
  );
}
