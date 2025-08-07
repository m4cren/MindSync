import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransfer, recordTransfer } from "@/store/transfer/asyncFunc";
import { useEffect } from "react";

export const useTransferState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const transfer = useSelector((state: RootState) => state.transfer);

   useEffect(() => {
      dispatch(fetchTransfer());
   }, [dispatch]);

   return {
      dispatch,
      transfer,
      recordTransfer,
   };
};
