"use client";
import { XIcon } from "lucide-react";
import React from "react";
import { taskCategoryBg } from "./Task";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

interface Props {
   setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
   filter: string | null;
}

const Filter = ({ setIsFilter, filter }: Props) => {
   const router = useRouter();
   return (
      <div className="absolute top-0 right-0 z-8 flex flex-col gap-[0.8vw] bg-card w-[20vw] h-fit rounded-[0.7vw] p-[1vw] shadow-2xl">
         <div className="flex items-center justify-between">
            <p className="text-[0.85vw] opacity-50">
               Filter by {filter ? filter : "..."}
            </p>
            <XIcon
               className="cursor-pointer"
               size={20}
               onClick={() => setIsFilter(false)}
            />
         </div>
         <hr className="opacity-10" />
         <ul className="flex flex-col gap-[0.4vw]">
            <li
               onClick={() => {
                  const params = new URLSearchParams();
                  params.delete("filter_tasks");

                  router.push(`?${params.toString()}`);
                  setIsFilter(false);
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
                        setIsFilter(false);
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
      </div>
   );
};

export default Filter;
