import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense, recordExpense } from "@/store/expense/asyncFunc";
import { useEffect } from "react";

export const useExpenseState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const expense = useSelector((state: RootState) => state.expense);

   useEffect(() => {
      dispatch(fetchExpense());
   }, [dispatch]);

   return {
      dispatch,
      expense,
      recordExpense,
   };
};
