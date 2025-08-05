import { configureStore } from "@reduxjs/toolkit";
import popupSliceReducer from "./popup/popupSlice";
import taskSliceReducer from "./tasks/taskSlice";
import accountSliceReducer from "./accounts/accountSlice";
import netWorthSliceReducer from "./netWorth/netWorthSlice";
import incomeSliceReducer from "./income/incomeSlice";
import expenseSliceReducer from "./expense/expenseSlice";
import transferSliceReducer from "./transfer/transferSlice";

export const store = configureStore({
   reducer: {
      popup: popupSliceReducer,
      tasks: taskSliceReducer,
      account: accountSliceReducer,
      netWorth: netWorthSliceReducer,
      income: incomeSliceReducer,
      expense: expenseSliceReducer,
      transfer: transferSliceReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // 🚨 disables all checks
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
