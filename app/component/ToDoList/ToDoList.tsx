"use client";
import { Funnel, Menu, Plus } from "lucide-react";
import Task from "./Task";
import { useEffect } from "react";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import AddTask from "./AddTask";
import Head from "./Head";

const ToDoList = () => {
   const {
      dispatch,
      popupState: { popup, togglePopup, untogglePopup },
   } = useGlobalState();
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
               <Task />
            </ul>
         </div>
         {popup.addTask && <AddTask />}
      </>
   );
};

export default ToDoList;
