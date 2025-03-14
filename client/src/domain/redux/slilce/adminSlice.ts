
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface UserState {
  admin: {
    email: string;
    name: string;
    role: string;
    _id ?: string;
  } | null;
  accessToken: string | null;
}

const initialState: UserState = {
  admin: null,
  accessToken: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state: UserState, action: PayloadAction<UserState>) => { 
        if (action.payload.admin) {
          const { _id, ...restUser } = action.payload.admin; 
          state.admin = restUser;  // ✅ Store user without `_id`
        } else {
          state.admin = null;
        }
        state.accessToken = action.payload.accessToken;
      },
    clearAdmin: (state) => {
      state.admin = null;
      state.accessToken = null;
    },
  },
});

export const { setAdmin , clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;