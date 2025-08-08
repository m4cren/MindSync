import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "@/store/accounts/asyncFunc";

export const useCreateAccount = () => {
   const dispatch = useDispatch<AppDispatch>();

   return {
      dispatch,
      createAccount,
   };
};
