import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { saveState } from "../utils/browser-storage";
import authSliceReducer from "./authentication/authSlice";
import quizProgressSliceReducer from "./quizProgress/quizProgressSlice";
import addQuestionSliceReducer from "./addQuestion/addQuestionSlice";

const localStorageMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = storeAPI.getState();
    if (action.type.startsWith("authentication/")) {
      saveState(state.auth, "app-key-users").catch((e) =>
        console.log(e, "Error saving the state")
      );
    }
    return result;
  };

const combinedReducers = combineReducers({
  auth: authSliceReducer,
  quizProgress: quizProgressSliceReducer,
  addQuestion: addQuestionSliceReducer
});

// combineReducers will be handled internally by configureStore
const rootReducer = (state: any, action: any) => {
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
