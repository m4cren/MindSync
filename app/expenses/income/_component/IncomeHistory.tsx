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
import { accountIconMap } from "../../_component/Accounts/Accounts";

const incomeHistoryHeader: { label: string; icon: LucideIcon }[] = [
   { label: "Income Stream", icon: Banknote },
   { label: "Amount", icon: Coins },
   { label: "Received In", icon: BanknoteArrowDown },
   { label: "Date", icon: Calendar },
];

const IncomeHistory = () => {
   const {
      incomeState: {
         income: { isPending, income },
      },
   } = useGlobalState();
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
            <table className="table-auto">
               <thead>
                  <tr>
                     {incomeHistoryHeader.map(({ icon, label }, key) => {
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
                  {income.map(
                     ({ amount, date_str, income_stream, received_in, id }) => {
                        const IconComponent = accountIconMap[received_in];
                        return (
                           <tr key={id} className="text-[0.9vw] ">
                              <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 {income_stream}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 ₱{amount}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <IconComponent size={16} />
                                    {received_in}
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

export default IncomeHistory;
