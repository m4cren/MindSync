"use client";
import {
   Calendar,
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
import { accountIconMap } from "../../_component/Accounts/Accounts";
import { sort } from "fast-sort";

const transferHistoryHeader: { label: string; icon: LucideIcon }[] = [
   { label: "From account", icon: Send },
   { label: "Amount", icon: Coins },
   { label: "To Account", icon: Mail },
   { label: "Date", icon: Calendar },
];

const TransferHistory = () => {
   const {
      transferState: {
         transfer: { transfer, isPending },
      },
   } = useGlobalState();

   const sortedByDate = sort(transfer).desc((item) =>
      new Date(item.date_str).getTime(),
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
            <table>
               <thead>
                  <tr>
                     {transferHistoryHeader.map(({ icon, label }, key) => {
                        const IconComponent = icon;
                        return (
                           <th key={key} className="py-[0.6vw] px-[0.5vw]">
                              <span className="flex items-center gap-[0.3vw] text-[0.9vw] font-medium opacity-80">
                                 <IconComponent size={15} />
                                 {label}
                              </span>
                           </th>
                        );
                     })}
                  </tr>
               </thead>
               <tbody>
                  {sortedByDate.map(
                     ({ amount, date_str, from_acc, to_acc, id }) => {
                        const FromAccountIcon = accountIconMap[from_acc];
                        const ToAccountIcon = accountIconMap[to_acc];
                        return (
                           <tr key={id} className="text-[0.9vw] ">
                              <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <FromAccountIcon size={16} />
                                    {from_acc}
                                 </span>
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 ₱{amount}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <ToAccountIcon size={16} />
                                    {to_acc}
                                 </span>
                              </td>
                              <td className="border-t-2  border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 {date_str}
                              </td>
                           </tr>
                        );
                     },
                  )}
               </tbody>
            </table>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no expense history
            </p>
         )}
      </div>
   );
};

export default TransferHistory;
