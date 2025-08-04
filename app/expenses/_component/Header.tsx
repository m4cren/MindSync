import { Landmark } from "lucide-react";
import React from "react";

const Header = () => {
   return (
      <div className="flex flex-col gap-[1vw] -mt-[3vw]">
         <Landmark size={100} />
         <h1 className="text-[2vw] font-bold">Finance Tracker</h1>
         <div className="flex items-center gap-[1.3vw]">
            <div className="bg-[#d4d4d450] w-[0.25vw] h-[3.5vw]"></div>
            <p className="text-[1vw]">
               <i>
                  &quot; Increase your income, Increase your savings, Increase
                  your investment returns, <br />
                  Decrease your expenses&quot;
               </i>
            </p>
         </div>
      </div>
   );
};

export default Header;
