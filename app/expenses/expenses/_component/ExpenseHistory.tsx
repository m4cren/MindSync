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
import { accountIconMap } from "../../_component/Accounts/Accounts";
import { budgetIconMap } from "../../_component/MonthlyBudget/BudgetCard";
import { sort } from "fast-sort";

const expenseHistoryHeader: { label: string; icon: LucideIcon }[] = [
   { label: "Expense on", icon: ShoppingBasket },
   { label: "Amount", icon: Coins },
   { label: "Category", icon: List },
   { label: "Source Account", icon: Vault },
   { label: "Date", icon: Calendar },
];

const ExpenseHistory = () => {
   const {
      expenseState: {
         expense: { isPending, expense },
      },
   } = useGlobalState();
   const sortedByDate = sort(expense).desc((item) =>
      new Date(item.date_str).getTime(),
   );
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
            <table>
               <thead>
                  <tr>
                     {expenseHistoryHeader.map(({ icon, label }, key) => {
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
                     ({ amount, date_str, account, category, label, id }) => {
                        const AccountIcon = accountIconMap[account];
                        const CategoryIcon = budgetIconMap[category];
                        return (
                           <tr key={id} className="text-[0.9vw] ">
                              <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                                 {label}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 ₱{amount}
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <CategoryIcon size={16} />
                                    {category}
                                 </span>
                              </td>
                              <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                                 <span className="flex items-center gap-[0.4vw]">
                                    <AccountIcon size={16} />
                                    {account}
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

export default ExpenseHistory;
