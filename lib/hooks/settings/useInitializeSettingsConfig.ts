"use client";
import { initializeSettingsConfig } from "@/store/settings/asyncFunc";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

export const useInitializeSettingsConfig = () => {
   const dispatch = useDispatch<AppDispatch>();
   const hasFetch = useRef<boolean>(false);
   const settingsConfig = useSelector(
      (state: RootState) => state.settingsConfig,
   );
   useEffect(() => {
      if (hasFetch.current) return;
      console.log("fetching");
      dispatch(initializeSettingsConfig());
      hasFetch.current = true;
   }, []);

   return settingsConfig;
};
