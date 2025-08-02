import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup, untogglePopup } from "@/store/popup/popupSlice";

export const useGlobalState = () => {
   const popup = useSelector((state: RootState) => state.popup);
   const dispatch = useDispatch<AppDispatch>();

   return { dispatch, popupState: { togglePopup, popup, untogglePopup } };
};
