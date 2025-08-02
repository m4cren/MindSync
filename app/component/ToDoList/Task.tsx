import React from "react";

const Task = () => {
   return (
      <li className="relative bg-card rounded-md w-full px-[1.2vw] py-[1vw] flex flex-col gap-[0.65vw]">
         <h4 className="font-medium text-[1.25vw]">Refactor Cord</h4>
         <p className="text-[0.9vw] opacity-70">August 4, 2025</p>
         <span className="bg-red-600/20 py-[0.3vw] px-[1.2vw] font-medium text-[0.75vw] rounded-sm w-fit">
            Work
         </span>
         <input
            type="checkbox"
            className="absolute bottom-[1vw] right-[1vw] size-[1.35vw]"
         />
      </li>
   );
};

export default Task;
