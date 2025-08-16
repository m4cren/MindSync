"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useSettingsConfig = () => {
   const dispatch = useDispatch<AppDispatch>();
   const settingsConfig = useSelector(
      (state: RootState) => state.settingsConfig,
   );
   console.log(settingsConfig.config);
   return {
      dispatch,
      isPending: settingsConfig.isPending,
      settings: settingsConfig.config,
   };
};
