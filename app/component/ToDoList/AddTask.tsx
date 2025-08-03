"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { generateToken } from "@/lib/idGenerator";
import { TaskFormTypes } from "@/lib/types";

import { Calendar, Logs } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { taskCategoryBg } from "./Task";

const AddTask = () => {
   const {
      dispatch,
      popupState: { untogglePopup },
      taskState: { addTask },
   } = useGlobalState();

   const { register, handleSubmit, setFocus } = useForm<TaskFormTypes>();

   useEffect(() => {
      setFocus("label");
   }, [setFocus]);

   const onSubmit = (data: TaskFormTypes) => {
      if (data && data.date) {
         const dateObj = new Date(data.date);
         // const id = generateToken(18);
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
      <div className="fixed bg-black/30 z-10 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[1.2vw] menuToggleAnimation bg-card w-[40vw] h-fit rounded-[1vw] p-[4vw]"
         >
            <input
               type="text"
               {...register("label")}
               id="label"
               className="outline-none font-semibold text-[1.8vw] w-full"
               placeholder="What do you need to get done?"
               autoComplete="off"
            />

            <div className="flex items-center gap-[3vw]">
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
            <div className="flex items-center gap-[3vw]">
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
                  id="date"
                  className="outline-none border-1 border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
               />
            </div>
         </form>
      </div>
   );
};

export default AddTask;
