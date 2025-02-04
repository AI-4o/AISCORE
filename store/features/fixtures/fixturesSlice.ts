import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Fixture, FixtureResponse } from "api/api-football/models/fixture"
import { makeGetAPIRouteUrl } from "api/api-football/utils"
import mockFixtures from "api/api-football/mock-responses/mock-fixtures/mock-fixtures-1.json";

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
export enum DataType {
  FIXTURES = 'fixtures',
  LEAGUE = 'league',
  TEAMS = 'teams',
  PLAYERS = 'players',
  STANDINGS = 'standings',
}

export type getAPIFootballParams = {
  dataName: DataType,
  queryParams: Record<string, string | number | boolean>,
  writeMock: boolean,
  mockCall: boolean
}
export interface FixturesState {
    fixtures: Fixture[]
    status: 'idle' | 'loading' | 'failed'
}
const initialState: FixturesState = {
  fixtures: [],
  status: 'idle'
}

// Slice -> used to create in 1 place reducers and actions logic, 
// - slice.actions returns the action creators
// - slice.reducer returns the reducer
export const fixturesSlice = createSlice({
  name: "fixtures",
  initialState,
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: builder => {
    builder
      // Handle the action types defined by the `incrementAsync` thunk defined below.
      // This lets the slice reducer update the state with request status and results.
      .addCase(fetchFixtures.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchFixtures.fulfilled, (state, action) => {
        state.status = "idle"
        state.fixtures = [...state.fixtures, ...action.payload.response]
      })
      .addCase(fetchFixtures.rejected, state => {
        state.status = "failed"
      })
  },
})

export default fixturesSlice.reducer

export const fetchFixtures = createAsyncThunk(
  "fixtures/fetchFixtures",
  async (params: getAPIFootballParams) => {
    let response: FixtureResponse;
    if(!params.mockCall) { // perform the api call if no fixtureResponse is provided
        response = await fetch(
            makeGetAPIRouteUrl(params),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(async res => {
            return await res.json() as FixtureResponse;
        });        
    } else { // return the mock fixtures
        response = mockFixtures as unknown as FixtureResponse
    }
    return response
  },
)
