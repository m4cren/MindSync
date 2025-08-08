import { RootState } from "@/store/store";

import { useSelector } from "react-redux";

export const useOnlyExpenseCategory = () => {
   const expenseCategory = useSelector(
      (state: RootState) => state.expenseCategory,
   );

   return { expenseCategory };
};
