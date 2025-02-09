import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Fixture,
  FixtureResponse,
} from "@/app/api/api-football/models/footballModels";
import mockFixtures from "@/app/api/api-football/mock-responses/mock-fixtures/mock-fixtures-1.json";
import mockTeam from "@/app/api/api-football/mock-responses/mock-teams/mock-teams-1.json";

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
export interface SpinnerState {
  isActive: boolean;
}
const initialState: SpinnerState = {
  isActive: false,
};

// Slice -> used to create in 1 place reducers and actions logic,
// - slice.actions returns the action creators
// - slice.reducer returns the reducer
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    setIsActiveSpinner: (state) => {
      state.isActive = true;
    },
    setIsInactiveSpinner: (state) => {
      state.isActive = false;
    },
  },
});

export default spinnerSlice.reducer;
export const { setIsActiveSpinner, setIsInactiveSpinner } =
  spinnerSlice.actions;
