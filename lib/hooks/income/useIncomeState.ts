import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchIncome, recordIncome } from "@/store/income/asyncFunc";

import { useEffect } from "react";

export const useIncomeState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const income = useSelector((state: RootState) => state.income);

   useEffect(() => {
      dispatch(fetchIncome());
   }, [dispatch]);

   return {
      dispatch,
      income,
      recordIncome,
   };
};
