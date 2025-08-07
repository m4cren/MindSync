import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

import { recordIncome } from "@/store/income/asyncFunc";

export const useRecordIncome = () => {
   const dispatch = useDispatch<AppDispatch>();

   return {
      dispatch,

      recordIncome,
   };
};
