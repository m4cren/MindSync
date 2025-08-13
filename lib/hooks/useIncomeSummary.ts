"use client";

import { IncomeCategoryTypes } from "../types";
import { useOnlyIncomeState } from "./income/useOnlyIncomeState";

export const useIncomeSummary = () => {
   const {
      income: { income, isPending },
   } = useOnlyIncomeState();

   const totalAmount = income.reduce((acc, curr) => {
      return (acc += curr.amount);
   }, 0);

   const data = income.reduce(
      (acc, curr) => {
         if (!acc[curr.income_type]) {
            acc[curr.income_type] = 0;
         }
         acc[curr.income_type] += curr.amount;

         return acc;
      },
      {} as Record<string, number>,
   );

   const incomeOverallDistribution = Object.entries(data).map(
      ([income_type, amount]) =>
         ({
            income_type,
            amount,
         }) as { income_type: IncomeCategoryTypes; amount: number },
   );

   return { incomeOverallDistribution, isPending, totalAmount, income };
};
