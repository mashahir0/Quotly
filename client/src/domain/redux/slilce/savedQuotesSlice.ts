import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SavedQuotesState {
  savedQuotes: string[]; // Array of post IDs
}

const initialState: SavedQuotesState = {
  savedQuotes: [],
};

const savedQuotesSlice = createSlice({
  name: "savedQuotes",
  initialState,
  reducers: {
    addQuote: (state, action: PayloadAction<string>) => {
      if (!state.savedQuotes.includes(action.payload)) {
        state.savedQuotes.push(action.payload);
      }
    },
    removeSavedQuote: (state, action: PayloadAction<string>) => {
      state.savedQuotes = state.savedQuotes.filter((id) => id !== action.payload);
    },
    clearQuote : (state )=>{
        state.savedQuotes = []
    }
  },
});

export const { addQuote, removeSavedQuote ,clearQuote } = savedQuotesSlice.actions;
export default savedQuotesSlice.reducer;
