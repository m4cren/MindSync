import { configureStore } from "@reduxjs/toolkit";
import popupSliceReducer from "./popup/popupSlice";

export const store = configureStore({
   reducer: {
      popup: popupSliceReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
