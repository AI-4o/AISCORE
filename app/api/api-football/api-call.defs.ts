export type getAPIFootballParams = {
  dataName: DataType;
  queryParams: Record<string, string | number | boolean>;
}

export enum DataType {
  FIXTURES = "fixtures",
  LEAGUE = "league",
  TEAMS = "teams",
  PLAYERS = "players",
  STANDINGS = "standings",
}