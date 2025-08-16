import { SettingsConfigStateTypes, SettingsConfigType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initializeSettingsConfig } from "./asyncFunc";

const initialState: SettingsConfigStateTypes = {
   config: {
      profile: {
         banner_url: "banner.gif",
         system_name: "MindSync",
         username: "User",
      },
      appearance: {
         theme: "dark",
         time_format: "12-hour",
      },
      accessibility: {
         animation: "on",
         font: "Inter",
      },
      keybinds: {
         add_task: ["ctrl", "0"],
         menu: ["ctrl", "alt"],
         record_habit: ["ctrl", "4"],
         record_expense: ["ctrl", "1"],
         record_income: ["ctrl", "2"],
         record_transfer: ["ctrl", "3"],
         toggle_close: ["ctrl", "."],
      },
   },
   errMsg: null,
   isPending: false,
};

const settingsConfigSlice = createSlice({
   name: "settingsConfig",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(
            initializeSettingsConfig.fulfilled,
            (state, action: PayloadAction<SettingsConfigType | null>) => {
               if (action.payload) {
                  state.config = action.payload;
               }

               state.isPending = false;
               state.errMsg = null;
            },
         )
         .addCase(initializeSettingsConfig.pending, (state) => {
            state.isPending = true;
         });
   },
});

export const {} = settingsConfigSlice.actions;
export default settingsConfigSlice.reducer;
