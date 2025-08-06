"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import {
   Banknote,
   BanknoteArrowDown,
   Calendar,
   Coins,
   Funnel,
   LucideIcon,
   Scroll,
} from "lucide-react";
import TableSkeleton from "../../account/_component/TableSkeleton";
import { sort } from "fast-sort";
import Table from "./Table";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/component/Pagination";
import { PAGE_SIZE } from "@/lib/constant";
import { usePagination } from "@/lib/hooks/usePagination";
import { IncomeTypes } from "@/lib/types";

const IncomeHistory = () => {
   const {
      incomeState: {
         income: { isPending, income },
      },
   } = useGlobalState();
   const searchParams = useSearchParams();
   const paramsName = "income_history_page";
   const currentPage = Number(searchParams.get(paramsName));

   const paginatedIncome = usePagination<IncomeTypes>(income, currentPage);
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Income History
               </h1>
            </div>
            <button className="cursor-pointer">
               <Funnel />
            </button>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : income.length !== 0 ? (
            <>
               <Table sortedByDate={paginatedIncome} />

               <Pagination
                  name={paramsName}
                  currentPage={currentPage}
                  items={income.length}
               />
            </>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no expense history
            </p>
         )}
      </div>
   );
};

export default IncomeHistory;
