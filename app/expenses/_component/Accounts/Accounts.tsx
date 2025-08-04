"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import {
   CreditCard,
   LucideIcon,
   PiggyBank,
   Siren,
   Users,
   Wallet,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import SkeletonCard from "./SkeletonCard";
import { AccountTypes, NetWorthArgs } from "@/lib/types";
import { sort } from "fast-sort";

export const accountIconMap: Record<string, LucideIcon> = {
   Wallet: Wallet,
   GCash: CreditCard,
   GoTyme: CreditCard,
   "Emergency Funds": Siren,
   "Investment Funds": PiggyBank,
};

const Accounts = () => {
   const {
      dispatch,

      accountState: { accounts },
      netWorthState: {
         netWorth: { netWorth },
         updateNetWorth,
      },
   } = useGlobalState();

   const dateToday = new Date();
   const hasUpdated = useRef(false);

   useEffect(() => {
      if (hasUpdated.current) return;
      const totalNetWorthThisDay: number = accounts.accounts.reduce(
         (sum: number, acc: AccountTypes) => {
            return sum + acc.balance;
         },
         0,
      );
      console.log(totalNetWorthThisDay);

      const formattedDate = dateToday.toLocaleDateString("en-US", {
         month: "short",
         day: "2-digit",
         year: "numeric",
      });
      const sortedNetWorth = sort(netWorth).desc((t) => t.date_str);
      console.log(formattedDate, sortedNetWorth[0].date_str);

      if (formattedDate === sortedNetWorth[0].date_str) {
         console.log("No record sshould be added");
      } else {
         const args: NetWorthArgs = {
            balance: totalNetWorthThisDay,
            date_str: formattedDate,
         };
         dispatch(updateNetWorth(args));
         hasUpdated.current = true;
      }
   }, []);
   return (
      <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Users size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
         </div>
         <hr className="text-card border-2" />
         {accounts.isPending ? (
            <SkeletonCard />
         ) : (
            <ul className="flex flex-col gap-[0.6vw]">
               {accounts.accounts.map(({ balance, name, id }) => {
                  const IconComponent = accountIconMap[name];
                  return (
                     <li
                        key={id}
                        className="flex flex-col gap-[0.4vw] bg-card rounded-[0.6vw] p-[1vw]"
                     >
                        <div className="flex items-center gap-[0.4vw]">
                           <IconComponent size={18} />
                           <h4 className="text-[1vw] font-bold">{name}</h4>
                        </div>
                        <h3 className="text-[1.2vw] opacity-80 font-light">
                           ₱{balance}
                        </h3>
                     </li>
                  );
               })}
            </ul>
         )}
      </div>
   );
};

export default Accounts;
