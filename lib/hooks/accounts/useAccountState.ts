import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchAccounts } from "@/store/accounts/asyncFunc";
import { useEffect } from "react";

export const useAccountState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const accounts = useSelector((state: RootState) => state.account);

   useEffect(() => {
      dispatch(fetchAccounts());
   }, [dispatch]);

   return {
      dispatch,
      accounts,
      fetchAccounts,
   };
};
