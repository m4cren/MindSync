"use client";

import { HandCoins } from "lucide-react";
import BudgetCard from "./BudgetCard";

import { useExpenseState } from "@/lib/hooks/expense/useExpenseState";
import { memo } from "react";
import CardSkeleton from "../CardSkeleton";
import { getMonthYear } from "../NetWorth/Chart";
import { useExpenseCategoryState } from "@/lib/hooks/expense/useExpenseCategoryState";

const MonthlyBudget = () => {
   const {
      expense: { expense, isPending },
   } = useExpenseState();

   const {
      expenseCategory: { expenseCategory },
   } = useExpenseCategoryState();

   const presentMonth = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
   });
   const dataThisMonth = expense.filter(({ date_str }) => {
      const monthYear = getMonthYear(date_str);

      return monthYear === getMonthYear(presentMonth);
   });
   type CategorySummary = [totalSpent: number, allocatedAmount: number];

   type BudgetAllocation = {
      category: string;
      categorySummary: CategorySummary;
   };

   const initialBudget: BudgetAllocation[] = expenseCategory.map(
      ({ alloc_per_month, label }) => {
         return {
            category: label,
            categorySummary: [0, Number(alloc_per_month)],
         };
      },
   );
   const groupByCategory = dataThisMonth.reduce(
      (acc, curr) => {
         const checkIfExisting = expenseCategory.find(
            ({ label }) => label === curr.category,
         );

         if (checkIfExisting && !acc[checkIfExisting?.label]) {
            acc[checkIfExisting.label] = [
               0,
               Number(checkIfExisting.alloc_per_month),
            ];
         }

         if (acc[curr.category]) {
            acc[curr.category][0] += curr.amount;
         }
         return acc;
      },
      {} as Record<string, [number, number]>,
   );
   const groupMap = new Map<string, CategorySummary>(
      Object.entries(groupByCategory),
   );
   const mergedBudget: BudgetAllocation[] = initialBudget.map(
      ({ category, categorySummary }) => {
         const updated = groupMap.get(category);
         return {
            category,
            categorySummary: updated
               ? [updated[0], categorySummary[1]] // use spent from actual data, allocation from initial
               : categorySummary,
         };
      },
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
         ) : mergedBudget.length !== 0 ? (
            <ul className="grid grid-cols-3 gap-[1.2vw]">
               {mergedBudget.map(({ category, categorySummary }, key) => (
                  <BudgetCard
                     key={key}
                     category={category}
                     amount={categorySummary[0]}
                     allocation={categorySummary[1]}
                  />
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
