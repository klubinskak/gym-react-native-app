import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    BMI: 0,
    BMR: 0,
    gender: '',
    height: 0,
    weight: 0,
    age: 0,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {value: initialState},
  reducers: {
    setInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
export const userInfo = state => state.userInfo.value;

