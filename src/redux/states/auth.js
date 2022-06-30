import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, checkAccessToken } from '../../services/http_service';

const persistState = checkAccessToken();

const initialState = {
  loggedIn: persistState?.token != null,
  user: null,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  // Fetch user data
  const { result } = await api.get('/user');
  return result;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loggedIn = payload != null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
