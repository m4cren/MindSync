import { ExpenseCategoryStateTypes, ExpenseCategoryTypes } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchExpenseCategory } from "./asyncFunc";

const initialState: ExpenseCategoryStateTypes = {
   expenseCategory: [],
   isPending: false,
   errMsg: null,
};

const expenseCategorySlice = createSlice({
   name: "expenseCategory",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(
            fetchExpenseCategory.fulfilled,
            (state, action: PayloadAction<ExpenseCategoryTypes[]>) => {
               state.isPending = false;
               state.errMsg = null;
               state.expenseCategory = action.payload;
            },
         )
         .addCase(fetchExpenseCategory.pending, (state) => {
            state.isPending = true;
         });
   },
});

export default expenseCategorySlice.reducer;
export const {} = expenseCategorySlice.actions;
