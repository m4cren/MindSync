import { Funnel, Menu } from "lucide-react";
import React from "react";

const Head = () => {
   return (
      <div className="flex items-center justify-between">
         <h2 className="font-medium text-[1.5vw]">To-Do List</h2>
         <div className="flex items-center gap-[1vw]">
            <button className="">
               <Funnel />
            </button>
            <button className="">
               <Menu />
            </button>
         </div>
      </div>
   );
};

export default Head;
