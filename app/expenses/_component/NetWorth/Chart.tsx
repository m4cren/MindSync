"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { NetWorthTypes } from "@/lib/types";
import { sort } from "fast-sort";
import { Landmark } from "lucide-react";
import React from "react";
import {
   CartesianGrid,
   Legend,
   Line,
   LineChart,
   Tooltip,
   TooltipContentProps,
   TooltipProps,
   XAxis,
   YAxis,
} from "recharts";
const groupNetWorthByMonth = (data: NetWorthTypes[]): NetWorthTypes[] => {
   const map = new Map<string, NetWorthTypes>();

   data.forEach(({ id, balance, date_str }) => {
      const month = date_str.slice(0, 7); // "YYYY-MM"

      if (map.has(month)) {
         const existing = map.get(month)!;
         existing.balance += balance;
      } else {
         map.set(month, {
            id: undefined, // or generate a new ID if needed
            balance,
            date_str: month, // only store "YYYY-MM" as date_str
         });
      }
   });

   return Array.from(map.values());
};
export const groupNetWorthByYear = (data: NetWorthTypes[]): NetWorthTypes[] => {
   const map = new Map<string, NetWorthTypes>();

   data.forEach(({ id, balance, date_str }) => {
      const year = date_str.slice(0, 4); // "YYYY"

      if (map.has(year)) {
         const existing = map.get(year)!;
         existing.balance += balance;
      } else {
         map.set(year, {
            id: undefined,
            balance,
            date_str: year,
         });
      }
   });

   return Array.from(map.values());
};

const Chart = () => {
   const {
      netWorthState: { netWorth },
   } = useGlobalState();

   const sortedData = sort(netWorth.netWorth).asc((t) => t.date_str);
   const reducedDataByMonth = groupNetWorthByMonth(sortedData);

   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Landmark size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Net Worth</h1>
         </div>
         <hr className="text-card border-2" />

         {netWorth.isPending ? (
            <div className="bg-card animate-pulse rounded-[0.5vw] h-[24.5vw]"></div>
         ) : (
            <LineChart
               width={850}
               height={350}
               data={reducedDataByMonth}
               layout="horizontal"
            >
               <CartesianGrid vertical={false} opacity={0.1} />
               <XAxis
                  dataKey="date_str"
                  tick={{
                     fontFamily: "Inter",
                     fontSize: 10,
                     fill: "#d4d4d470",
                  }}
               />
               <YAxis
                  tick={{
                     fontFamily: "Inter",
                     fontSize: 10,
                     fill: "#d4d4d490",
                  }}
               />
               <Tooltip content={CustomTooltip} isAnimationActive={false} />

               <Line type="monotone" dataKey="balance" stroke="#d4d4d4" />
            </LineChart>
         )}
      </div>
   );
};

export default Chart;

const CustomTooltip = ({
   active,
   label,
   payload,
}: TooltipContentProps<number, string>) => {
   if (!active || !payload || payload.length === 0) return null;

   const data = payload[0] as { value: number };
   return (
      <div className="flex flex-col gap-[0.2vw] bg-card p-[0.5vw] rounded-[0.5vw]">
         <p className="text-[0.75vw] text-[#d4d4d440]">{label}</p>
         <p className="text-[0.9vw] text-[#d4d4d4] font-normal">
            ₱{data.value}
         </p>
      </div>
   );
};
