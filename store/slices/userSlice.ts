import { IUser } from "@/commons/interfaces/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  users: IUser[];
  token: string | null;
}

const initialState: IInitialState = {
  users: [],
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, deleteUser, updateUser, setToken } = userSlice.actions;
export default userSlice.reducer;
