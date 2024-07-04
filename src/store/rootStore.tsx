import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./authentication/authSlice";

const combinedReducers = combineReducers({
  auth: authSliceReducer,
});

// combineReducers will be handled internally by configureStore
const rootReducer = (state, action) => {
  if (action.type === "therapist/logoutResetStore") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
export type RootStateType = ReturnType<typeof store.getState>