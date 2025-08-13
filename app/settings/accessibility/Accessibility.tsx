"use client";
import DropDownSelection from "@/app/component/DropDownSelection";
import React, { useState } from "react";

const Accessibility = () => {
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
               <li className="flex items-center gap-[0.6vw]">
                  <button className="rounded-full h-[1.5vw] w-[1.5vw] border-6 border-flame bg-white"></button>
                  On
               </li>
               <li className="flex items-center gap-[0.6vw]">
                  <button className="rounded-full h-[1.5vw] w-[1.5vw] border-3 border-[#d4d4d450] bg-transparent"></button>
                  Off
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Accessibility;
