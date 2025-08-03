"use client";

import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { useEffect } from "react";
import AddTask from "./AddTask";
import Head from "./Head";
import Task from "./Task";
import TaskSkeleton from "./TaskSkeleton";
import { sort } from "fast-sort";
import { useSearchParams } from "next/navigation";

const ToDoList = () => {
   const searchParams = useSearchParams();
   const filter = searchParams.get("filter_tasks");
   const {
      dispatch,
      popupState: { popup, togglePopup, untogglePopup },
      taskState: {
         tasks: { tasks, isLoading },
      },
   } = useGlobalState();

   const sortedTasks = sort(tasks).desc((t) => t.date);
   const filteredTasks = !filter
      ? sortedTasks
      : sortedTasks.filter(({ category }) => category === filter);

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key.toLocaleLowerCase() === "0") {
            dispatch(togglePopup("addTask"));
         }
         if (e.ctrlKey && e.key.toLocaleLowerCase() === ".") {
            dispatch(untogglePopup("addTask"));
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   return (
      <>
         <div className="relative flex flex-col gap-[1.3vw] w-[75%]">
            <Head />
            <hr className="border-[0.15vw] text-card " />
            <ul className="flex flex-col gap-[0.7vw] max-h-[35vw] pb-[12vw] overflow-y-scroll [mask-image:linear-gradient(to_top,transparent,black_69%)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_69%)]">
               {isLoading ? (
                  <TaskSkeleton />
               ) : filteredTasks.length > 0 ? (
                  filteredTasks.map(
                     ({ category, date_str, label, id, date }) => (
                        <Task
                           key={id}
                           category={category}
                           label={label}
                           date_str={date_str}
                           id={id!}
                           date={date!}
                        />
                     ),
                  )
               ) : (
                  <h3 className="text-center opacity-50 font-medium">
                     No task
                  </h3>
               )}
            </ul>
         </div>

         {popup.addTask && <AddTask />}
      </>
   );
};

export default ToDoList;
