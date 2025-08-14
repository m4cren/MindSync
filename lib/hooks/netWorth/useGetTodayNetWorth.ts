import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useAccountState } from "../accounts/useAccountState";
import { useEffect } from "react";
import { getNetWorth } from "@/store/netWorth/totalNetTodaySlice";

export const useGetTodayNetWorth = () => {
   const dispatch = useDispatch<AppDispatch>();
   const {
      accounts: { accounts },
   } = useAccountState();

   useEffect(() => {
      dispatch(getNetWorth(accounts));
   }, [accounts]);

   return { accounts };
};
