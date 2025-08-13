import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useOnlyIncomeState = () => {
   const income = useSelector((state: RootState) => state.income);

   return {
      income,
   };
};
