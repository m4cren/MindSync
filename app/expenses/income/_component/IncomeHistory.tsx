"use client";

import Pagination from "@/app/component/Pagination";
import { useIncomeState } from "@/lib/hooks/income/useIncomeState";
import { usePagination } from "@/lib/hooks/usePagination";
import { IncomeTypes } from "@/lib/types";
import { Scroll } from "lucide-react";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "../../account/_component/TableSkeleton";
import Table from "./Table";
import ShowAmountButton from "../../_component/ShowAmountButton";

const IncomeHistory = () => {
   const {
      income: { income, isPending },
   } = useIncomeState();
   const searchParams = useSearchParams();
   const paramsName = "income_history_page";
   const currentPage = Number(searchParams.get(paramsName));

   const paginatedIncome = usePagination<IncomeTypes>(income, currentPage);
   return (
      <div className="relative min-h-[24vw] flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Income History Table
               </h1>
            </div>
            <ShowAmountButton />
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : income.length !== 0 ? (
            <>
               <Table sortedByDate={paginatedIncome} />
               <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <Pagination
                     name={paramsName}
                     currentPage={currentPage}
                     items={income.length}
                  />
               </div>
            </>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               No earnings tracked
            </p>
         )}
      </div>
   );
};

export default IncomeHistory;
