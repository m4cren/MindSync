"use client";
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
const data = [
   {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
   },
   {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
   },
   {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
   },
   {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
   },
   {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
   },
   {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
   },
   {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
   },
];

const netWorthData = [
   {
      accumulatedNetWorth: 3980,
      date: "Aug 4, 2025",
   },
   {
      accumulatedNetWorth: 4980,
      date: "Sep 1, 2025",
   },
   {
      accumulatedNetWorth: 5880,
      date: "Oct 27, 2025",
   },
   {
      accumulatedNetWorth: 4580,
      date: "Nov 3, 2025,",
   },
   {
      accumulatedNetWorth: 6980,
      date: "Dec 15, 2025",
   },
   {
      accumulatedNetWorth: 8980,
      date: "Jan 8, 2026",
   },
   {
      accumulatedNetWorth: 7980,
      date: "Feb 14, 2026",
   },
];

const Chart = () => {
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Landmark size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Net Worth</h1>
         </div>
         <hr className="text-card border-2" />

         <LineChart
            width={850}
            height={350}
            data={netWorthData}
            layout="horizontal"
         >
            <CartesianGrid vertical={false} opacity={0.1} />
            <XAxis
               dataKey="date"
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

            <Line
               type="monotone"
               dataKey="accumulatedNetWorth"
               stroke="#d4d4d4"
            />
         </LineChart>
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
            ${data.value}
         </p>
      </div>
   );
};
