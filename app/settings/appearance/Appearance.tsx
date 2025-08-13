import { Check } from "lucide-react";
import React from "react";

const Form = () => {
   return (
      <div className="flex flex-col gap-[2vw]">
         <div className="flex flex-col gap-[0.5vw]">
            <h4 className="text-[1.5vw] font-bold">Theme</h4>
            <p className="text-[0.85vw] font-medium opacity-60">
               Adjust the color of the interace for better visibility.
            </p>
            <ul className="flex items-center gap-[0.5vw]">
               <li className="cursor-pointer bg-[#d4d4d4] rounded-full w-[3vw] h-[3vw]"></li>
               <li className="cursor-pointer relative bg-card rounded-full w-[3vw] h-[3vw] border-2 border-flame">
                  <span className="absolute bottom-0 right-0 bg-flame p-[0.15vw] rounded-full">
                     <Check size={8} />
                  </span>
               </li>
            </ul>
         </div>
         <hr className="text-[#2c2c2c] border-1" />
         <div className="flex flex-col gap-[1vw]">
            <h4 className="text-[1.5vw] font-bold">Time Format</h4>

            <ul className="flex flex-col gap-[0.75vw] text-[0.9vw] font-semibold ">
               <li className="flex items-center gap-[0.6vw]">
                  <button className="rounded-full h-[1.5vw] w-[1.5vw] border-6 border-flame bg-white"></button>
                  12-hour
               </li>
               <li className="flex items-center gap-[0.6vw]">
                  <button className="rounded-full h-[1.5vw] w-[1.5vw] border-3 border-[#d4d4d450] bg-transparent"></button>
                  24-hour
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Form;
