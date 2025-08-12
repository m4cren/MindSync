import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import {
   fetchNetWorth,
   updateNetWorth,
   initializeNetWorth,
} from "@/store/netWorth/asyncFunc";

import { useEffect, useRef } from "react";

export const useNetworthState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const netWorth = useSelector((state: RootState) => state.netWorth);

   const hasFetch = useRef<boolean>(false);

   useEffect(() => {
      if (hasFetch.current) return;
      dispatch(initializeNetWorth());
      dispatch(fetchNetWorth());
      hasFetch.current = true;
   }, [dispatch]);

   return {
      dispatch,
      netWorth,
      fetchNetWorth,
      updateNetWorth,
   };
};
