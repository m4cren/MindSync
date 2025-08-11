"use client";

import Pagination from "@/app/component/Pagination";
import { useExpenseState } from "@/lib/hooks/expense/useExpenseState";
import { usePagination } from "@/lib/hooks/usePagination";
import { ExpenseTypes } from "@/lib/types";
import { Scroll } from "lucide-react";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "../../account/_component/TableSkeleton";
import Table from "./Table";

const ExpenseHistory = () => {
   const {
      expense: { expense, isPending },
   } = useExpenseState();
   const pageName = "expense_history_page";
   const searchParams = useSearchParams();
   const currentPage = Number(searchParams.get(pageName));
   const paginatedExpense = usePagination<ExpenseTypes>(expense, currentPage);
   return (
      <div className="relative flex flex-col gap-[1vw] w-full min-h-[24vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Expense History
               </h1>
            </div>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : expense.length !== 0 ? (
            <>
               <Table items={paginatedExpense} />
               <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                  {" "}
                  <Pagination
                     currentPage={currentPage}
                     items={expense.length}
                     name={pageName}
                  />
               </div>
            </>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no expense history
            </p>
         )}
      </div>
   );
};

export default ExpenseHistory;
