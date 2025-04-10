import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  _id:string;
  email: string;
  name: string;
  role: string;
  password?:string;
}

export interface AuthState {
  user: UserData | null;
  admin: UserData | null;
}

const initialState: AuthState = {
  user: null,
  admin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserData & { _id?: string } }>) => { 
      const { password, ...filteredUser } = action.payload.user; // Remove `_id`
      state.user = filteredUser;  // ✅ Update only user, keep admin intact
    },
    setAdmin: (state, action: PayloadAction<{ admin: UserData & { _id?: string } }>) => { 
      const { password, ...filteredAdmin } = action.payload.admin; // Remove `_id`
      state.admin = filteredAdmin;  // ✅ Update only admin, keep user intact
    },
    clearAdmin: (state) => {
      state.admin = null;  // ✅ Only clear admin, user remains
    },
    clearUser: (state) => {
      state.user = null;  // ✅ Only clear user, admin remains
    },
  },
});

export const { setUser, setAdmin, clearAdmin, clearUser } = authSlice.actions;
export default authSlice.reducer;
export { authSlice };
