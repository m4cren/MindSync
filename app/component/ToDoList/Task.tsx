"use client";

import { useTasksState } from "@/lib/hooks/tasks/useTasksState";
import classNames from "classnames";
import {
   AlertCircle,
   File,
   FileQuestion,
   House,
   LucideIcon,
   PersonStanding,
   School,
   SquareCheck,
   Users,
   Wallet,
} from "lucide-react";
import React, { useState } from "react";

interface Props {
   id: string;
   label: string;
   category: string;
   date_str: string | undefined;
   date: Date | null;
}
export const taskCategoryBg: Record<string, { bg: string; icon: LucideIcon }> =
   {
      Study: { bg: "bg-indigo-500/20", icon: School },
      Personal: { bg: "bg-rose-500/20", icon: PersonStanding },
      Work: { bg: "bg-amber-500/20", icon: File },
      Home: { bg: "bg-emerald-500/20", icon: House },
      Errands: { bg: "bg-violet-500/20", icon: Wallet },
      Social: { bg: "bg-blue-500/20", icon: Users },
      Others: { bg: "bg-gray-400/20", icon: FileQuestion },
   };
const Task = ({ category, date_str, label, id, date }: Props) => {
   const [isDone, setIsDone] = useState<boolean>(false);
   const { finishTask, dispatch } = useTasksState();
   const todayStr = new Date().toISOString().slice(0, 10);
   const taskDateStr = new Date(date!).toISOString().slice(0, 10);

   const isOverdue = taskDateStr < todayStr;

   return (
      <>
         <li
            className={classNames(
               " relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]",
               {
                  finishTaskAnimation: isDone,
               },
            )}
         >
            <h4 className="font-medium text-[1.25vw]">{label}</h4>
            <div className="flex items-center justify-between">
               <p className="text-[0.9vw] opacity-70">{date_str}</p>
               {date && isOverdue && (
                  <span className="flex items-center gap-[0.5vw] bg-red-500/20 text-[0.8vw] rounded-[0.2vw] px-[0.7vw] py-[0.23vw]">
                     Task is overdue <AlertCircle size={15} />
                  </span>
               )}
            </div>
            <span
               className={`${taskCategoryBg[category].bg} py-[0.25vw] px-[1.2vw] font-medium text-[0.75vw] rounded-[0.2vw] w-fit`}
            >
               {category}
            </span>
            <button
               onClick={() => {
                  setIsDone(true);
                  dispatch(finishTask(id));
               }}
               className="absolute bottom-[1.25vw] right-[1.4vw] hover:scale-110 active:scale-90 hover:text-green-500 transition-all duration-200 size-[1.35vw] cursor-crosshair"
            >
               <SquareCheck />
            </button>
         </li>
      </>
   );
};

export default Task;
