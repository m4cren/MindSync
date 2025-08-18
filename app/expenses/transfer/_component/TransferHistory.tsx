"use client";
import { Scroll } from "lucide-react";
import TableSkeleton from "../../account/_component/TableSkeleton";

import Pagination from "@/app/component/Pagination";
import { useTransferState } from "@/lib/hooks/transfer/useTransferState";
import { usePagination } from "@/lib/hooks/usePagination";
import { TransferTypes } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Table from "./Table";
import ShowAmountButton from "../../_component/ShowAmountButton";

const TransferHistory = () => {
   const {
      transfer: { isPending, transfer },
   } = useTransferState();
   const searchParams = useSearchParams();
   const paramsName = "transfer_history_page";
   const currentPage = Number(searchParams.get(paramsName));

   const paginatedTransfer = usePagination<TransferTypes>(
      transfer,
      currentPage,
   );
   return (
      <div className="relative min-h-[24vw] flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Scroll size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Transfer History
               </h1>
            </div>
            <ShowAmountButton />
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <TableSkeleton />
         ) : transfer.length !== 0 ? (
            <>
               <Table sortedByDate={paginatedTransfer} />
               <div className="absolute top-[90%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <Pagination
                     name={paramsName}
                     currentPage={currentPage}
                     items={transfer.length}
                  />
               </div>
            </>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no transfer transactions
            </p>
         )}
      </div>
   );
};

export default TransferHistory;
