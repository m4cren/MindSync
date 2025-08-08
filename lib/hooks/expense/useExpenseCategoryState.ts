import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchExpenseCategory } from "@/store/expense/asyncFunc";

export const useExpenseCategoryState = () => {
   const dispatch = useDispatch<AppDispatch>();
   const expenseCategory = useSelector(
      (state: RootState) => state.expenseCategory,
   );

   useEffect(() => {
      dispatch(fetchExpenseCategory());
   }, []);

   return { expenseCategory };
};
