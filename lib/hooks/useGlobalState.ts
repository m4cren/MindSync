import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup, untogglePopup } from "@/store/popup/popupSlice";
import { fetchTasks, addTask, finishTask } from "@/store/tasks/asyncFunc";
import { useEffect } from "react";

export const useGlobalState = () => {
   const popup = useSelector((state: RootState) => state.popup);
   const tasks = useSelector((state: RootState) => state.tasks);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchTasks());
   }, []);

   return {
      dispatch,
      popupState: { togglePopup, popup, untogglePopup },
      taskState: { tasks, fetchTasks, addTask, finishTask },
   };
};
