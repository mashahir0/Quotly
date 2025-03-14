




import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
export interface UserState {
  user: {
    email: string;
    name: string;
    role: string;
    _id ?: string;
    password ?: string
  } | null;
  accessToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => { 
      if (action.payload.user) {
        const { _id, password, ...restUser } = action.payload.user; 
        state.user = restUser;  // ✅ Store user without `_id`
      } else {
        state.user = null;
      }
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
