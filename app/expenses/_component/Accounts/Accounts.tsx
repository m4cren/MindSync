"use client";

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
import { AccountNameTypes, AccountTypes, NetWorthArgs } from "@/lib/types";
import { sort } from "fast-sort";
import { useAccountState } from "@/lib/hooks/accounts/useAccountState";
import { useNetworthState } from "@/lib/hooks/useNetworthState";

export const accountIconMap: Record<AccountNameTypes, LucideIcon> = {
   Wallet: Wallet,
   GCash: CreditCard,
   GoTyme: CreditCard,
   "Emergency Funds": Siren,
   "Investment Funds": PiggyBank,
};

const Accounts = () => {
   const {
      accounts: { accounts, isPending },
   } = useAccountState();
   const {
      netWorth: { netWorth },
      updateNetWorth,
      dispatch,
   } = useNetworthState();

   const hasUpdated = useRef(false);
   const dateToday = new Date();
   const formattedDate = dateToday.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
   });

   useEffect(() => {
      if (hasUpdated.current) return;
      const totalNetWorthThisDay: number = accounts.reduce(
         (sum: number, acc: AccountTypes) => {
            return sum + acc.balance;
         },
         0,
      );
      const sortedNetWorth = sort(netWorth).desc((t) =>
         new Date(t.date_str).getTime(),
      );

      if (!sortedNetWorth[0]) return;
      if (formattedDate === sortedNetWorth[0].date_str) {
         console.log("No record added");
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
         {isPending ? (
            <SkeletonCard />
         ) : (
            <ul className="flex flex-col gap-[0.6vw]">
               {accounts.map(({ balance, name, id }) => {
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
                        <h3 className="text-[1vw] opacity-80 font-light">
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
