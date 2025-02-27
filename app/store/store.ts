import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import footballReducer from "../store/features/fixtures/fixturesSlice"
import spinnerReducer from "./features/dialog/dialogSlice"
import playersReducer from "./features/players/playersSlice"

/**
ON CREATING A STORE
When we pass in an object like {counter: counterReducer}, that says that we want 
to have a state.counter section of our Redux state object, and that we want the 
counterReducer function to be in charge of deciding if and how to update the 
state.counter section whenever an action is dispatched.
 */
export const store = configureStore({
  reducer: {
    football: footballReducer,
    spinner: spinnerReducer,
    players: playersReducer
  },
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
// Define a reusable type for thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
