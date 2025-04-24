import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";

interface UserState {
  currentUser: any;
  isAuthenticated: boolean;
  loginModal: boolean;
}

const initialState: UserState = {
  currentUser: {
    iin: "",
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    phoneNumber: "",
    permissions: [],
    status: "",
  },
  isAuthenticated: false,
  loginModal: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLogin: (state) => {
      state.isAuthenticated = true;
    },
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export const { setUser, setLogin, openLoginModal, closeLoginModal, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
