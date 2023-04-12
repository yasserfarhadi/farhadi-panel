import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../api/Models/User';

import { fetchUsers } from '../../../api';
import { Row } from '../../../types/CardRow';

interface InitialState {
  isLoading: boolean;
  data: User[];
  error: string | null;
  searchParam: string;
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  error: '',
  searchParam: '',
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_data, thunkApi) => {
    try {
      const users = await fetchUsers();
      return users;
    } catch (error: any) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    editItem: (state, action: PayloadAction<Row>) => {
      const foundItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        Object.assign(foundItem, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<User[] | undefined>) => {
          state.isLoading = false;
          if (action.payload && action.payload.length !== 0) {
            state.data = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Somthing went wrong';
      });
  },
});

export default usersSlice.reducer;
export const { setSearchParam, editItem } = usersSlice.actions;
