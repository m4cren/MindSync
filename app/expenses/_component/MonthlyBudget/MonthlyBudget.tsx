"use client";

import { BudgetTypes } from "@/lib/types";
import { HandCoins } from "lucide-react";
import BudgetCard from "./BudgetCard";

import { useExpenseState } from "@/lib/hooks/expense/useExpenseState";
import { memo } from "react";
import CardSkeleton from "../CardSkeleton";
import { getMonthYear } from "../NetWorth/Chart";

const MonthlyBudget = () => {
   const {
      expense: { expense, isPending },
   } = useExpenseState();
   console.log("monthly budget rendered");
   const presentMonth = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
   });
   const dataThisMonth = expense.filter(({ date_str }) => {
      const monthYear = getMonthYear(date_str);

      return monthYear === getMonthYear(presentMonth);
   });

   const groupByCategory = dataThisMonth.reduce(
      (acc, curr) => {
         if (!acc[curr.category]) {
            acc[curr.category] = 0;
         }

         acc[curr.category]! += curr.amount;

         return acc;
      },
      {} as Record<string, number>,
   );

   const toArray: { category: BudgetTypes; amount: number }[] = Object.entries(
      groupByCategory,
   ).map(
      ([category, amount]) =>
         ({
            category,
            amount,
         }) as { category: BudgetTypes; amount: number },
   );

   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <HandCoins size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">
               Monthly Budget
            </h1>
         </div>
         <hr className="text-card border-2" />
         {isPending ? (
            <CardSkeleton />
         ) : toArray.length !== 0 ? (
            <ul className="grid grid-cols-3 gap-[1.2vw]">
               {toArray.map(({ amount, category }, key) => (
                  <BudgetCard key={key} category={category} amount={amount} />
               ))}
            </ul>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no expense history
            </p>
         )}
      </div>
   );
};

export default memo(MonthlyBudget);
