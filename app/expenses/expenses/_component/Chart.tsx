"use client";
import { CustomTooltip } from "@/app/component/CustomToolTip";
import { useExpenseState } from "@/lib/hooks/expense/useExpenseState";

import { LayoutList, ShoppingBag, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
   Bar,
   BarChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";

const Chart = () => {
   const {
      expense: { expense, isPending },
   } = useExpenseState();

   const [hasMounted, setHasMounted] = useState(false);
   const [filter, setFilter] = useState<"account" | "category">("category");

   const reduced = expense.reduce(
      (acc, curr) => {
         if (!acc[curr[filter]]) {
            acc[curr[filter]] = 0;
         }

         acc[curr[filter]] += curr.amount;

         return acc;
      },
      {} as Record<string, number>,
   );

   const sortedBy = Object.entries(reduced).map(
      ([category, amount]) =>
         ({
            category,
            amount,
         }) as { category: string; amount: number },
   );

   useEffect(() => {
      setHasMounted(true);
   }, []);

   return (
      <div className="relative flex flex-col gap-[1vw]  w-full h-[33vw] border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <ShoppingBag size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Spending Breakdown by{" "}
                  {filter === "category" ? "Category" : "Account"}
               </h1>
            </div>
            <button
               className="cursor-pointer"
               onClick={() =>
                  setFilter((prev) =>
                     prev === "account" ? "category" : "account",
                  )
               }
            >
               {filter === "category" ? (
                  <LayoutList size={18} />
               ) : (
                  <UserIcon size={18} />
               )}
            </button>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <div className="bg-card animate-pulse  rounded-[0.5vw] h-[24.5vw]"></div>
         ) : hasMounted && sortedBy.length !== 0 ? (
            <ResponsiveContainer width={"100%"} height={"100%"}>
               <BarChart
                  width={800}
                  height={400}
                  data={sortedBy}
                  layout="horizontal"
               >
                  <CartesianGrid vertical={false} opacity={0.1} />
                  <XAxis
                     dataKey="category"
                     tick={{
                        fontFamily: "Inter",
                        fontSize: 12,
                        fill: "#d4d4d470",
                     }}
                  />
                  <YAxis
                     dataKey="amount"
                     tick={{
                        fontFamily: "Inter",
                        fontSize: 10,
                        fill: "#d4d4d490",
                     }}
                  />
                  <Tooltip
                     content={CustomTooltip}
                     isAnimationActive={false}
                     cursor={false}
                  />

                  <Bar
                     dataKey="amount"
                     fill="#fa8c01"
                     radius={[8, 8, 0, 0]}
                     barSize={75}
                  />
               </BarChart>
            </ResponsiveContainer>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no expense history
            </p>
         )}
      </div>
   );
};

export default Chart;
