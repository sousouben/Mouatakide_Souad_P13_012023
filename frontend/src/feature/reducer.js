import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  data: null,
  error: null,
  token: null,
};

const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    userDataFetching: (draft) => {
      draft.dataStatus = "pending";
      draft.error = null;
    },
    userDataResolved: (draft, action) => {
      draft.dataStatus = "resolved";
      draft.data = action.payload.data;
      draft.token = action.payload.token;
    },
    userDataRejected: (draft, action) => {
      draft.dataStatus = "rejected";
      draft.error = action.payload;
      draft.data = null;
    },
    userTokenFetching: (draft) => {
      draft.tokenStatus = "pending";
      draft.error = null;
    },
    userTokenResolved: (draft, action) => {
      draft.tokenStatus = "resolved";
      draft.data = action.payload;
    },
    userTokenRejected: (draft, action) => {
      draft.tokenStatus = "rejected";
      draft.error = action.payload.message;
      draft.data = null;
    },
    userUpdateProfile: (draft, action) => {
      draft.data.firstName = action.payload.firstName;

      draft.data.lastName = action.payload.lastName;
    },
  },
});

export { actions };
export default reducer;
