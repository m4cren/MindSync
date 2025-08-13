import {
   createAccount,
   editAccount,
   deleteAccount,
} from "@/store/accounts/asyncFunc";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export const useCreateAccount = () => {
   const dispatch = useDispatch<AppDispatch>();

   return {
      dispatch,
      createAccount,
      deleteAccount,
      editAccount,
   };
};
