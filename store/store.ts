import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import fixturesReducer from "../store/features/fixtures/fixturesSlice"
import spinnerReducer from "../store/features/spinner/spinnerSlice"

/**
ON CREATING A STORE
When we pass in an object like {counter: counterReducer}, that says that we want 
to have a state.counter section of our Redux state object, and that we want the 
counterReducer function to be in charge of deciding if and how to update the 
state.counter section whenever an action is dispatched.
 */
export const store = configureStore({
  reducer: {
    fixtures: fixturesReducer,
    spinner: spinnerReducer 
  },
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]> // ottieni il tipo dello stato dello store, lo esportiamo
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
// Define a reusable type for thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
