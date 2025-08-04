import { AccountStateTypes, AccountTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { number } from "zod";
import { fetchAccounts } from "./asyncFunc";

const initialState: AccountStateTypes = {
   accounts: [],
   isPending: false,
   errMsg: null,
};

const accountSlice = createSlice({
   name: "account",
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(
            fetchAccounts.fulfilled,
            (state, action: PayloadAction<AccountTypes[]>) => {
               state.accounts = action.payload;
               state.isPending = false;
            },
         )
         .addCase(fetchAccounts.pending, (state) => {
            state.isPending = true;
         });
   },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
