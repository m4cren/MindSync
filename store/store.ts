import { configureStore } from "@reduxjs/toolkit";
import popupSliceReducer from "./popup/popupSlice";
import taskSliceReducer from "./tasks/taskSlice";

export const store = configureStore({
   reducer: {
      popup: popupSliceReducer,
      tasks: taskSliceReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // 🚨 disables all checks
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
