"use client";
import { useSettingsConfig } from "@/lib/hooks/settings/useSettingsConfig";
import React from "react";

const Keybinds = () => {
   const {
      settings: { keybinds },
   } = useSettingsConfig();
   const keybindConfig = [
      {
         action: "Menu",
         keys: keybinds.menu,
      },
      {
         action: "Toggle close",
         keys: keybinds.toggle_close,
      },
      {
         action: "Record Expense",
         keys: keybinds.record_expense,
      },
      {
         action: "Record Income",
         keys: keybinds.record_income,
      },
      {
         action: "Record Transfer",
         keys: keybinds.record_transfer,
      },
      {
         action: "Record Habit",
         keys: keybinds.record_habit,
      },
      {
         action: "Add Task",
         keys: keybinds.add_task,
      },
   ];
   return (
      <div className="flex flex-col gap-[2vw]">
         {keybindConfig.map(({ action, keys }, index) => {
            return (
               <div key={index}>
                  <div className="flex items-center justify-between">
                     <h6 className="text-[1.3vw] opacity-90 font-semibold">
                        {action}
                     </h6>
                     <div className="flex gap-[0.4vw]">
                        {keys.map((item, key) => (
                           <span
                              key={key}
                              className="cursor-pointer bg-[#2c2c2c] px-[1vw] py-[0.2vw] font-bold uppercase rounded-[0.4vw] text-[0.9vw]"
                           >
                              {item}
                           </span>
                        ))}
                     </div>
                  </div>
                  {index < keybindConfig.length - 1 && (
                     <hr className="text-[#2c2c2c] border-1 mt-[2vw]" />
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default Keybinds;
