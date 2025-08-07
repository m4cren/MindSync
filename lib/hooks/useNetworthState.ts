import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchNetWorth, updateNetWorth } from "@/store/netWorth/asyncFunc";

import { useEffect } from "react";

export const useNetworthState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const netWorth = useSelector((state: RootState) => state.netWorth);

   useEffect(() => {
      dispatch(fetchNetWorth());
   }, [dispatch]);

   return {
      dispatch,
      netWorth,
      fetchNetWorth,
      updateNetWorth,
   };
};
