"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { FiltererTypes, NetWorthTypes } from "@/lib/types";
import { sort } from "fast-sort";
import { Funnel, Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import {
   CartesianGrid,
   Line,
   LineChart,
   Tooltip,
   TooltipContentProps,
   XAxis,
   YAxis,
} from "recharts";
import DateFilter from "./DateFilter";
const monthMap: Record<string, string> = {
   Jan: "01",
   Feb: "02",
   Mar: "03",
   Apr: "04",
   May: "05",
   Jun: "06",
   Jul: "07",
   Aug: "08",
   Sep: "09",
   Oct: "10",
   Nov: "11",
   Dec: "12",
};

export const getMonthYear = (date: string) => {
   const [month, , year] = date.split(" ");

   return `${month} ${year}`;
};

const getYear = (date: string) => {
   const [, , year] = date.split(" ");

   return `${year}`;
};

const Chart = () => {
   const {
      netWorthState: { netWorth },
   } = useGlobalState();
   const [filterChart, setFilterChart] = useState<FiltererTypes>(null);
   const sortData = (array: NetWorthTypes[], filterer: FiltererTypes) => {
      const reduced = array.reduce(
         (acc, curr) => {
            const key =
               filterer === "Month"
                  ? getMonthYear(curr.date_str)!
                  : filterer === "Year"
                    ? getYear(curr.date_str)!
                    : curr.date_str!;

            if (!acc[key]) {
               acc[key] = 0;
            }

            acc[key]! += curr.balance;

            return acc;
         },
         {} as Record<string, number>,
      );

      return reduced;
   };

   const convertToArray = Object.entries(
      sortData(netWorth.netWorth, filterChart),
   ).map(([date_str, balance]) => ({
      balance,
      date_str,
   }));

   const sortedData = sort(convertToArray).asc((item) => {
      if (filterChart === "Month") {
         const [monthStr, year] = item.date_str.split(" ");
         const month = monthMap[monthStr];

         return new Date(`${year}-${month}`).getTime();
      } else {
         return new Date(item.date_str).getTime();
      }
   });

   const [isFilter, setIsFilter] = useState<boolean>(false);
   const [hasMounted, setHasMounted] = useState(false);

   useEffect(() => {
      setHasMounted(true);
   }, []);

   return (
      <div className="relative flex flex-col gap-[1vw]  h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         {isFilter && (
            <DateFilter
               filterChart={filterChart}
               setFilterChart={setFilterChart}
               setIsFilter={setIsFilter}
            />
         )}

         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <Landmark size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">
                  Net Worth
               </h1>
            </div>
            <button
               className="cursor-pointer"
               onClick={() => setIsFilter(true)}
            >
               <Funnel />
            </button>
         </div>
         <hr className="text-card border-2" />

         {netWorth.isPending ? (
            <div className="bg-card animate-pulse  rounded-[0.5vw] h-[24.5vw]"></div>
         ) : (
            hasMounted && (
               <LineChart
                  // width={1080} for Desktop application
                  width={800}
                  // height={540}
                  height={400}
                  data={sortedData}
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
            )
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
