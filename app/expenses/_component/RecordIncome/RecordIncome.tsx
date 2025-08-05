"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";

import { useEffect } from "react";
import IncomeForm from "./IncomeForm";

const RecordIncome = () => {
   const {
      dispatch,
      popupState: { popup, togglePopup, untogglePopup },
   } = useGlobalState();

   useEffect(() => {
      const toggleRecordIncome = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.key.toLocaleLowerCase() === "2") {
            dispatch(togglePopup("recordIncome"));
         } else if (e.ctrlKey && e.key === ".") {
            dispatch(untogglePopup("recordIncome"));
         }
      };

      window.addEventListener("keydown", toggleRecordIncome);

      return () => {
         window.removeEventListener("keydown", toggleRecordIncome);
      };
   }, []);

   if (popup.recordIncome) {
      return (
         <div className=" fixed bg-black/30 z-10 backdrop-blur-[1vw] top-0 left-0 bottom-0 right-0 flex  items-center justify-start">
            <div className="recordIncomeToggleAnimation flex flex-col items-end justify-center px-[3vw] pb-[5vw] gap-[1.2vw] w-[35vw] bg-card rounded-r-[2vw] h-screen">
               <h2 className="text-[2.5vw] font-bold w-[22vw]">
                  Record Income
               </h2>
               <IncomeForm />
            </div>
         </div>
      );
   }
};

export default RecordIncome;
