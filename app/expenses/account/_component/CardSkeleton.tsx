import React from "react";

const CardSkeleton = () => {
   return (
      <ul className="grid grid-cols-3 gap-[1.2vw]">
         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>
         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>
         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>
         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>

         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>
         <li className="bg-card animate-pulse h-[6.5vw] p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"></li>
      </ul>
   );
};

export default CardSkeleton;
