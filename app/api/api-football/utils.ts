import qs from "qs";
import { API_PATH } from "appConfig";

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
export enum DataType {
  FIXTURES = "fixtures",
  LEAGUE = "league",
  TEAMS = "teams",
  PLAYERS = "players",
  STANDINGS = "standings",
}

export type getAPIFootballParams = {
  dataName: DataType;
  queryParams: Record<string, string | number | boolean>;
  writeMock: boolean;
  mockCall: boolean;
};

/**
 * Utility function to create the url to call the route to get the api data
 * @param params
 * @returns The url to call the route to get the api data
 */
export const makeGetAPIRouteUrl = (params: getAPIFootballParams) => {
  const res = `/api/api-football/get-api?dataType=${params.dataName}&`+
        `${qs.stringify(params.queryParams)}&`+
        `mock=${params.mockCall}&`+
        `writeMock=${params.writeMock}`;
  return res;
};
