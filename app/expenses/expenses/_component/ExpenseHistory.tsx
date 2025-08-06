"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import {
   Calendar,
   Coins,
   Funnel,
   List,
   LucideIcon,
   Scroll,
   ShoppingBasket,
   Vault,
} from "lucide-react";
import React from "react";
import TableSkeleton from "../../account/_component/TableSkeleton";
import { sort } from "fast-sort";
import { usePagination } from "@/lib/hooks/usePagination";
import { ExpenseTypes } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import Pagination from "@/app/component/Pagination";

const ExpenseHistory = () => {
   const {
      expenseState: {
         expense: { isPending, expense },
      },
   } = useGlobalState();
   const pageName = "expense_history_page";
   const searchParams = useSearchParams();
   const currentPage = Number(searchParams.get(pageName));
   const paginatedExpense = usePagination<ExpenseTypes>(expense, currentPage);
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Expense History
               </h1>
            </div>
            <button className="cursor-pointer">
               <Funnel />
            </button>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : expense.length !== 0 ? (
            <>
               <Table items={paginatedExpense} />
               <Pagination
                  currentPage={currentPage}
                  items={expense.length}
                  name={pageName}
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

export default ExpenseHistory;
