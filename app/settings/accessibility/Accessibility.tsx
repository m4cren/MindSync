"use client";
import DropDownSelection from "@/app/component/DropDownSelection";
import { capitalFirstLetter } from "@/app/expenses/account/_component/NewAccountForm";
import { useSettingsConfig } from "@/lib/hooks/settings/useSettingsConfig";
import classNames from "classnames";
import React, { useState } from "react";

const animationOptions = ["on", "off"];

const Accessibility = () => {
   const {
      settings: { accessibility },
   } = useSettingsConfig();
   const [selectedFont, setSelectedFont] = useState<string | null>(null);
   return (
      <div className="flex flex-col gap-[2vw]">
         <div className="flex flex-col gap-[0.5vw]">
            <h4 className="text-[1.5vw] font-bold">Font</h4>
            <p className="text-[0.85vw] font-medium opacity-60">
               Adjust the font of the interface for better readability.
            </p>
            <DropDownSelection
               selectionLabel="Select Font"
               type="dropdown"
               selectedItem={selectedFont}
            >
               <ul>
                  <li onClick={() => setSelectedFont("Inter")}>Inter</li>
                  <li onClick={() => setSelectedFont("Space Grotesk")}>
                     Space Grotesk
                  </li>
               </ul>
            </DropDownSelection>
         </div>
         <hr className="text-[#2c2c2c] border-1" />
         <div className="flex flex-col gap-[1vw]">
            <h4 className="text-[1.5vw] font-bold">Animations</h4>

            <ul className="flex gap-[1vw] text-[0.9vw] font-semibold ">
               {animationOptions.map((item, key) => (
                  <li key={key} className="flex items-center gap-[0.6vw]">
                     <button
                        className={classNames(
                           "rounded-full h-[1.5vw] w-[1.5vw] border-3 border-[#d4d4d450] bg-transparent",
                           {
                              "border-6 border-flame bg-white!":
                                 accessibility.animation === item,
                           },
                        )}
                     ></button>
                     {capitalFirstLetter(item)}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Accessibility;
