import {
   addNewExpenseCategory,
   editExpenseCategory,
   deleteExpenseCategory,
} from "@/store/expense/asyncFunc";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export const useActionExpenseCategory = () => {
   const dispatch = useDispatch<AppDispatch>();
   return {
      addNewExpenseCategory,
      dispatch,
      editExpenseCategory,
      deleteExpenseCategory,
   };
};
