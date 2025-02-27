import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Player,
  PlayerStatistics,
  PlayerTransfer,
} from "@/app/api/api-football/models/footballModels";
import { config } from "appConfig";
import qs from "qs";

export interface PlayersState {
  players: Player[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  status: "idle",
  error: null,
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    clearPlayerData: (state) => {
      state.players = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayersData.fulfilled, (state, action) => {
        state.status = "idle";
        state.players = action.payload.players;
      })
      .addCase(fetchPlayersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch players data";
      });
  },
});

export const { clearPlayerData } = playerSlice.actions;

export const fetchPlayerData = createAsyncThunk(
  "player/fetchPlayerData",
  async ({ playerId, season }: { playerId: number; season?: number }) => {
    const currentSeason = season || new Date().getFullYear();
    
    const response = await fetch(
      `/api/api-football/get-player?id=${playerId}&season=${currentSeason}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      return await res.json();
    });
    
    return response;
  }
);

export const fetchPlayersData = createAsyncThunk(
  "players/fetchPlayersData",
  async (teamId: number) => {
    const response = await fetch(`/api/api-football/get-players?teamId=${teamId}`).then(async (res) => {
      return await res.json();
    });
    return response;
  }
);

export default playerSlice.reducer; 