import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

import { recordTransfer } from "@/store/transfer/asyncFunc";

export const useRecordTransfer = () => {
   const dispatch = useDispatch<AppDispatch>();

   return {
      dispatch,

      recordTransfer,
   };
};
