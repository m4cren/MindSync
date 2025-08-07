import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useOnlyAccount = () => {
   const dispatch = useDispatch<AppDispatch>();

   const accounts = useSelector((state: RootState) => state.account);

   return {
      dispatch,
      accounts,
   };
};
