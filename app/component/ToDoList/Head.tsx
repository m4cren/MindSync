import { Funnel, XIcon } from "lucide-react";
import { useState } from "react";
import Filter from "./Filter";
import { useRouter, useSearchParams } from "next/navigation";
import DropDownSelection from "../DropDownSelection";
import classNames from "classnames";
import { taskCategoryBg } from "./Task";

const Head = () => {
   const searchParams = useSearchParams();
   const filter = searchParams.get("filter_tasks");
   const router = useRouter();
   return (
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-[0.4vw] ">
            <h2 className="font-medium text-[1.5vw]">To-Do List</h2>
            {filter && (
               <p className="text-[0.75vw]  opacity-60 ">
                  Filtered by: {filter}
               </p>
            )}
         </div>
         <div>
            <DropDownSelection selectionLabel="Select Filter" type="icon">
               <ul className="flex flex-col gap-[0.4vw]">
                  <li
                     onClick={() => {
                        const params = new URLSearchParams();
                        params.delete("filter_tasks");

                        router.push(`?${params.toString()}`);
                     }}
                     className={classNames(
                        "flex items-center gap-[0.6vw] text-[1vw] cursor-pointer hover:bg-[#d4d4d410] py-[0.25vw] rounded-[0.4vw] px-[0.65vw]",
                        {
                           "bg-[#d4d4d410]": !filter,
                        },
                     )}
                  >
                     All
                  </li>
                  {Object.keys(taskCategoryBg).map((key) => {
                     const IconComponent = taskCategoryBg[key].icon;
                     return (
                        <li
                           key={key}
                           onClick={() => {
                              const params = new URLSearchParams();
                              params.append("filter_tasks", key);

                              router.push(`?${params.toString()}`);
                           }}
                           className={classNames(
                              "flex items-center gap-[0.6vw] text-[1vw] cursor-pointer hover:bg-[#d4d4d410] py-[0.25vw] px-[0.65vw] rounded-[0.4vw]",
                              {
                                 "bg-[#d4d4d410]": filter === key,
                              },
                           )}
                        >
                           <IconComponent size={18} />
                           {key}
                        </li>
                     );
                  })}
               </ul>
            </DropDownSelection>
         </div>
      </div>
   );
};

export default Head;
