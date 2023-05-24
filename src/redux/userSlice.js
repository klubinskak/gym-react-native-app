import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isSignedIn: false
};

export const userSlice = createSlice({
  name: "user",
  initialState: {value: initialState},
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.value.isSignedIn = true
    },
    login: (state, action) => {
      state.user = action.payload;
      state.value.isSignedIn = true
    },
    logOut: (state) => {
      state.user = initialState;
      state.value.isSignedIn = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {register, logOut, login} = userSlice.actions;

export default userSlice.reducer;
export const user = state => state.user.value;
export const isSignedIn = state => state.user.value.isSignedIn;

