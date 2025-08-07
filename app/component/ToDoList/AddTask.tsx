"use client";

import { TaskFormTypes } from "@/lib/types";

import { usePopupState } from "@/lib/hooks/popup/usePopupState";
import { useTasksState } from "@/lib/hooks/tasks/useTasksState";
import { Calendar, Logs, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { taskCategoryBg } from "./Task";

const AddTask = () => {
   const { addTask, dispatch } = useTasksState();
   const { untogglePopup } = usePopupState();

   const { register, handleSubmit, setFocus } = useForm<TaskFormTypes>();

   useEffect(() => {
      setFocus("label");
   }, [setFocus]);

   const onSubmit = (data: TaskFormTypes) => {
      if (data && data.date) {
         const dateObj = new Date(data.date);

         const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
         });

         dispatch(addTask({ ...data, date_str: formattedDate }));
      }
      dispatch(untogglePopup("addTask"));
   };

   return (
      <div className="fixed bg-black/30 z-8 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-[1.5vw] menuToggleAnimation bg-card w-[40vw] h-fit rounded-[1vw] p-[4vw]"
         >
            <input
               type="text"
               {...register("label")}
               id="label"
               className="outline-none font-semibold text-[1.8vw] w-[27vw]"
               placeholder="What do you need to get done?"
               autoComplete="off"
            />

            <div className="flex items-center gap-[3vw] justify-between w-[27vw]">
               <label
                  htmlFor="category"
                  className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
               >
                  <Logs size={20} />
                  Category
               </label>
               <select
                  {...register("category")}
                  id="category"
                  className="border-1 border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
               >
                  {Object.keys(taskCategoryBg).map((item) => (
                     <option key={item} value={item}>
                        {item}
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex items-center gap-[3vw] justify-between w-[27vw]">
               <label
                  htmlFor="date"
                  className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
               >
                  <Calendar size={20} />
                  Due date
               </label>
               <input
                  {...register("date")}
                  type="date"
                  required
                  id="date"
                  className="outline-none border-1 border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
               />
            </div>
            <button
               type="submit"
               className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center w-[27vw]"
            >
               <Plus />
               Add Task
            </button>
         </form>
      </div>
   );
};

export default AddTask;
