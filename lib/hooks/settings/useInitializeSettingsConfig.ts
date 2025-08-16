import { initializeSettingsConfig } from "@/store/settings/asyncFunc";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export const useInitializeSettingsConfig = () => {
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(initializeSettingsConfig());
   }, []);

   return null;
};
