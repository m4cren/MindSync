import { PopupStateTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PopupStateTypes = {
   addTask: false,
   menu: false,
   recordExpense: false,
   recordHabit: false,
   recordIncome: false,
   recordTransfer: false,
};

export const popupSlice = createSlice({
   name: "popup",
   initialState,
   reducers: {
      togglePopup: (
         state,
         action: PayloadAction<
            | "menu"
            | "recordHabit"
            | "recordIncome"
            | "recordExpense"
            | "addTask"
            | "recordTransfer"
         >,
      ) => {
         const keys: Array<keyof typeof state> = [
            "menu",
            "addTask",
            "recordExpense",
            "recordIncome",
            "recordTransfer",
            "recordHabit",
         ];

         const allInactive = keys.every(
            (key) => key === action.payload || !state[key],
         );

         if (allInactive) {
            keys.forEach((key) => {
               state[key] = key === action.payload;
            });
         }
      },

      untogglePopup: (
         state,
         action: PayloadAction<
            | "menu"
            | "recordHabit"
            | "recordIncome"
            | "recordExpense"
            | "addTask"
            | "recordTransfer"
         >,
      ) => {
         state[action.payload] = false;
      },
   },
});

export const { togglePopup, untogglePopup } = popupSlice.actions;
export default popupSlice.reducer;
