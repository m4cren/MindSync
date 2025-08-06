"use client";
import {
   Calendar,
   ChevronLeft,
   ChevronRight,
   Coins,
   Funnel,
   LucideIcon,
   Mail,
   Scroll,
   Send,
} from "lucide-react";
import React from "react";
import TableSkeleton from "../../account/_component/TableSkeleton";
import { useGlobalState } from "@/lib/hooks/useGlobalState";

import { sort } from "fast-sort";
import Table from "./Table";
import Pagination from "@/app/component/Pagination";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constant";
import { usePagination } from "@/lib/hooks/usePagination";
import { TransferTypes } from "@/lib/types";

const TransferHistory = () => {
   const {
      transferState: {
         transfer: { transfer, isPending },
      },
   } = useGlobalState();
   const searchParams = useSearchParams();
   const paramsName = "transfer_history_page";
   const currentPage = Number(searchParams.get(paramsName));

   const paginatedTransfer = usePagination<TransferTypes>(
      transfer,
      currentPage,
   );
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Transfer History
               </h1>
            </div>
            <button className="cursor-pointer">
               <Funnel />
            </button>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : transfer.length !== 0 ? (
            <>
               <Table sortedByDate={paginatedTransfer} />
               <Pagination
                  name={paramsName}
                  currentPage={currentPage}
                  items={transfer.length}
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

export default TransferHistory;
