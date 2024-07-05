import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { saveState } from "../utils/browser-storage";
import authSliceReducer from "./authentication/authSlice";
import quizProgressSliceReducer from "./quizProgress/quizProgressSlice";

const localStorageMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = storeAPI.getState();
    if (action.type.startsWith("auth/")) {
      saveState(state.auth, "app-key").catch((e) =>
        console.log(e, "Error saving the state")
      );
    }
    return result;
  };

const combinedReducers = combineReducers({
  auth: authSliceReducer,
  quizProgress: quizProgressSliceReducer,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
export type RootStateType = ReturnType<typeof store.getState>;
