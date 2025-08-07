import { togglePopup, untogglePopup } from "@/store/popup/popupSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "recharts/types/state/store";

export const usePopupState = () => {
   const dispatch = useDispatch<AppDispatch>();
   const popup = useSelector((state: RootState) => state.popup);

   return {
      dispatch,
      togglePopup,
      popup,
      untogglePopup,
   };
};
