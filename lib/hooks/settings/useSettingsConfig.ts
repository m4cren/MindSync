import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useSettingsConfig = () => {
   const dispatch = useDispatch<AppDispatch>();
   const settingsConfig = useSelector(
      (state: RootState) => state.settingsConfig,
   );

   return {
      dispatch,
      isPending: settingsConfig.isPending,
      errMsg: settingsConfig.errMsg,

      profileConfig: settingsConfig.config.profile,
      appearanceConfig: settingsConfig.config.appearance,
      accessibility: settingsConfig.config.accessibility,
      keybindConfig: settingsConfig.config.keybinds,
   };
};
