"use client";
import { CustomTooltip } from "@/app/component/CustomToolTip";
import { useOnlyAccount } from "@/lib/hooks/accounts/useOnlyAccount";
import { User } from "lucide-react";
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
      accounts: { accounts, isPending },
   } = useOnlyAccount();

   const [hasMounted, setHasMounted] = useState<boolean>(false);

   useEffect(() => {
      setHasMounted(true);
   }, []);

   return (
      <div className="relative flex flex-col gap-[1vw] w-[20vw] h-[22vw]  border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.6vw]">
               <User size={18} />

               <h1 className="text-[0.9vw] font-medium opacity-50">Account</h1>
            </div>
         </div>
         <hr className="text-card border-2" />

         {isPending ? (
            <div className="bg-card animate-pulse  rounded-[0.5vw] h-[24.5vw]"></div>
         ) : hasMounted && accounts.length !== 0 ? (
            <ResponsiveContainer width={"100%"} height={"100%"}>
               <BarChart data={accounts}>
                  <CartesianGrid vertical={false} opacity={0.1} />
                  <XAxis
                     dataKey="name"
                     tick={{
                        fontFamily: "Inter",
                        fontSize: 6,
                        fill: "#d4d4d470",
                     }}
                     angle={45}
                     tickMargin={5}
                  />
                  <YAxis
                     width={20}
                     dataKey="balance"
                     tick={{
                        fontFamily: "Inter",
                        fontSize: 6,
                        fill: "#d4d4d490",
                     }}
                  />
                  <Tooltip
                     content={CustomTooltip}
                     isAnimationActive={false}
                     cursor={false}
                  />

                  <Bar
                     dataKey="balance"
                     fill="#fa8c01"
                     radius={[5, 5, 0, 0]}
                     barSize={27}
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
