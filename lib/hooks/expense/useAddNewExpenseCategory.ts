import { addNewExpenseCategory } from "@/store/expense/asyncFunc";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export const useAddNewExpenseCategory = () => {
   const dispatch = useDispatch<AppDispatch>();
   return { addNewExpenseCategory, dispatch };
};
