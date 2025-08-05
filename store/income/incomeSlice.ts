import { IncomeStateTypes, IncomeTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIncome } from "./asyncFunc";

const initialState: IncomeStateTypes = {
   income: [],
   isPending: false,
   errMsg: null,
};

const incomeSlice = createSlice({
   name: "income",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(
            fetchIncome.fulfilled,
            (state, action: PayloadAction<IncomeTypes[]>) => {
               state.income = action.payload;
               state.isPending = false;
               state.errMsg = null;
            },
         )
         .addCase(fetchIncome.pending, (state) => {
            state.isPending = true;
         });
   },
});

export const {} = incomeSlice.actions;
export default incomeSlice.reducer;
