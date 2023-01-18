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
    userDataFetching: {
      prepare: (token) => ({
        payload: { token },
      }),
      reducer: (draft, action) => {
        if (draft.dataStatus === undefined) {
          return initialState;
        }
        if (draft.dataStatus === "void") {
          draft.dataStatus = "pending";
          return;
        }
        if (draft.dataStatus === "rejected") {
          draft.dataStatus = "pending";
          draft.error = null;
          return;
        }
        if (draft.dataStatus === "resolved") {
          draft.dataStatus = "updating";
          return;
        }
      },
    },
    userDataResolved: {
      prepare: (token, data) => ({
        payload: { token, data },
      }),
      reducer: (draft, action) => {
        if (draft.dataStatus === undefined) {
          return initialState;
        }
        if (draft.dataStatus === "pending" || draft.dataStatus === "updating") {
          draft.dataStatus = "resolved";
          draft.data = action.payload.data;
          draft.token = action.payload.token;
          return;
        }
      },
    },
    userDataRejected: {
      prepare: (token, error) => ({
        payload: { token, error },
      }),
      reducer: (draft, action) => {
        if (draft.dataStatus === undefined) {
          return initialState;
        }
        if (draft.dataStatus === "pending" || draft.dataStatus === "updating") {
          draft.dataStatus = "rejected";
          draft.error = action.payload;
          draft.data = null;
          return;
        }
      },
    },
    userTokenFetching: {
      prepare: (userLogin) => ({
        payload: { userLogin },
      }),
      reducer: (draft, action) => {
        if (draft.tokenStatus === undefined) {
          return initialState;
        }
        if (draft.tokenStatus === "void") {
          draft.tokenStatus = "pending";
          return;
        }
        if (draft.tokenStatus === "rejected") {
          draft.tokenStatus = "pending";
          draft.error = null;
          return;
        }
        if (draft.tokenStatus === "resolved") {
          draft.tokenStatus = "updating";
          return;
        }
      },
    },
    userTokenResolved: {
      prepare: (userLogin, token) => ({
        payload: { userLogin, token },
      }),
      reducer: (draft, action) => {
        if (draft.tokenStatus === undefined) {
          return initialState;
        }
        if (
          draft.tokenStatus === "pending" ||
          draft.tokenStatus === "updating"
        ) {
          draft.tokenStatus = "resolved";
          draft.data = action.payload;
          return;
        }
      },
    },
    userTokenRejected: {
      prepare: (userLogin, error) => ({
        payload: { userLogin, error },
      }),
      reducer: (draft, action) => {
        if (draft.tokenStatus === undefined) {
          return initialState;
        }
        if (
          draft.tokenStatus === "pending" ||
          draft.tokenStatus === "updating"
        ) {
          draft.tokenStatus = "rejected";
          draft.error = action.payload.message;
          draft.data = null;
          return;
        }
      },
    },
    userUpdateProfile: {
      prepare: (token, firstName, lastName) => ({
        payload: { token, firstName, lastName },
      }),
      reducer: (draft, action) => {
        draft.data.firstName = action.payload.firstName;
        draft.data.lastName = action.payload.lastName;
        return;
      },
    },
    reset: {
      reducer: () => {
        return initialState;
      },
    },
  },
});

export { actions };
export default reducer;
