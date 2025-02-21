import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TogglePayload = {
  content?: {
    header?: React.ReactNode;
    body?: React.ReactNode;
  };
  autoClose?: boolean;
  isSpinner?: boolean;
}
export interface DialogSlice {
  isActive: boolean;
  isSpinner: boolean;
  content?: {
    header?: React.ReactNode;
    body?: React.ReactNode;
  };
  autoClose: boolean;
}
const initialState: DialogSlice = {
  isActive: false,
  isSpinner: false,
  content: undefined,
  autoClose: false
};

// Slice -> used to create in 1 place reducers and actions logic,
// - slice.actions returns the action creators
// - slice.reducer returns the reducer
export const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    toggleDialog: (state, action: PayloadAction<TogglePayload | undefined>) => {
      state.isActive = !state.isActive;
      state.isSpinner = !!action?.payload?.isSpinner;

      if (action.payload?.isSpinner) {
        state.autoClose = true;
      }
      else {
        state.content = action?.payload?.content ?? undefined; 
        state.autoClose = action?.payload?.autoClose ?? false;
      }
    }
  },
});

export default spinnerSlice.reducer;
export const { toggleDialog } =
  spinnerSlice.actions;
