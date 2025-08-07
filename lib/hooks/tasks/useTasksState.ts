import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks, addTask, finishTask } from "@/store/tasks/asyncFunc";

import { useEffect } from "react";

export const useTasksState = () => {
   const dispatch = useDispatch<AppDispatch>();

   const tasks = useSelector((state: RootState) => state.tasks);

   useEffect(() => {
      dispatch(fetchTasks());
   }, [dispatch]);

   return {
      dispatch,
      tasks,

      addTask,
      finishTask,
   };
};
