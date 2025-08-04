import React from "react";
import {
   BanknoteArrowDown,
   BanknoteArrowUp,
   LucideIcon,
   Recycle,
   User,
} from "lucide-react";

const dashboardIconMap: Record<string, LucideIcon> = {
   Account: User,
   Income: BanknoteArrowUp,
   Expenses: BanknoteArrowDown,
   Transfer: Recycle,
};
const Dashboard = () => {
   return (
      <div
         className="flex flex-col gap-[1vw] w-[20vw] h-fit
             border-2 border-card rounded-[0.5vw] p-[1.25vw]"
      >
         <p className="text-[0.9vw] font-medium opacity-50">Dashboard</p>
         <hr className="text-card border-2" />
         <ul className="flex flex-col px-[1vw] gap-[0.8vw]">
            {Object.keys(dashboardIconMap).map((key) => {
               const IconComponent = dashboardIconMap[key];
               return (
                  <li
                     key={key}
                     className="flex items-center gap-[0.5vw] text-[1vw]"
                  >
                     <IconComponent size={20} />
                     {key}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Dashboard;
