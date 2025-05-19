import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import userReducer from "./userSlice";
import archiveReducer from "./archiveSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    user: userReducer,
    archive: archiveReducer,
  },
});
