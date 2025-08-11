"use client";

import { useAccountState } from "@/lib/hooks/accounts/useAccountState";
import {
   BanknoteArrowDown,
   BanknoteArrowUp,
   LucideIcon,
   Scale,
   Scroll,
   Text,
} from "lucide-react";
import { accountIconMapp } from "../../_component/Accounts/Accounts";
import TableSkeleton from "./TableSkeleton";

const tableHeader: { label: string; icon: LucideIcon }[] = [
   { label: "Account Name", icon: Text },
   { label: "Total Balance", icon: Scale },
   { label: "Total Income", icon: BanknoteArrowDown },
   { label: "Total Expense", icon: BanknoteArrowUp },
];

const Details = () => {
   const { accounts } = useAccountState();
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Scroll size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Details</h1>
         </div>
         <hr className="text-card border-2" />

         {accounts.isPending ? (
            <TableSkeleton />
         ) : (
            <table>
               <thead>
                  <tr>
                     {tableHeader.map(({ icon, label }, index) => {
                        const IconComponent = icon;
                        return (
                           <th key={index} className="py-[0.6vw] px-[0.5vw]">
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
                  {accounts.accounts.map(
                     ({
                        balance,
                        name,
                        total_expense,
                        total_income,
                        id,
                        icon,
                     }) => {
                        const IconComponent = accountIconMapp[icon];
                        return (
                           <tr key={id} className="text-[0.9vw] ">
                              <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <IconComponent size={16} />
                                    {name}
                                 </span>
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 ₱{balance.toLocaleString()}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 ₱{total_income.toLocaleString()}
                              </td>
                              <td className="border-t-2  border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 ₱{total_expense.toLocaleString()}
                              </td>
                           </tr>
                        );
                     },
                  )}
               </tbody>
            </table>
         )}
      </div>
   );
};

export default Details;
