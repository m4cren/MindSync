import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { recordExpense } from "@/store/expense/asyncFunc";

export const useRecordExpense = () => {
   const dispatch = useDispatch<AppDispatch>();

   return {
      dispatch,

      recordExpense,
   };
};
