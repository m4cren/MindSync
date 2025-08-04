"use client";
import React from "react";

const SkeletonCard = () => {
   return (
      <ul className="flex flex-col gap-[0.6vw]">
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
         <li className="flex flex-col animate-pulse h-[5vw] bg-card rounded-[0.6vw]"></li>
      </ul>
   );
};

export default SkeletonCard;
