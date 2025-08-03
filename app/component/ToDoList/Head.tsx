import { Funnel } from "lucide-react";
import { useState } from "react";
import Filter from "./Filter";
import { useSearchParams } from "next/navigation";

const Head = () => {
   const [isFilter, setIsFilter] = useState<boolean>(false);
   const searchParams = useSearchParams();
   const filter = searchParams.get("filter_tasks");
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
            <button
               onClick={() => setIsFilter(true)}
               className="cursor-pointer flex flex-col items-center gap-[0.4vw]"
            >
               <Funnel />
            </button>
            {isFilter && <Filter setIsFilter={setIsFilter} filter={filter} />}
         </div>
      </div>
   );
};

export default Head;
