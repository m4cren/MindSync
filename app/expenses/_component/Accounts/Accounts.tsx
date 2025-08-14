"use client";

import { useAccountState } from "@/lib/hooks/accounts/useAccountState";
import { useNetworthState } from "@/lib/hooks/netWorth/useNetworthState";
import { AccountIconTypes, AccountTypes, NetWorthArgs } from "@/lib/types";
import { sort } from "fast-sort";
import {
   CreditCard,
   Landmark,
   LucideIcon,
   PiggyBank,
   Users,
   Wallet,
} from "lucide-react";
import { useEffect, useRef } from "react";
import SkeletonCard from "./SkeletonCard";
import { useTodayNetWorth } from "@/lib/hooks/netWorth/useTodayNetWorth";

export const accountIconMapp: Record<AccountIconTypes, LucideIcon> = {
   wallet: Wallet,
   card: CreditCard,
   bank: Landmark,
   savings: PiggyBank,
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

   const totalNetWorthThisDay = useTodayNetWorth();

   useEffect(() => {
      if (hasUpdated.current) return;

      const sortedNetWorth = sort(netWorth).desc((t) =>
         new Date(t.date_str).getTime(),
      );

      if (!sortedNetWorth[0] && totalNetWorthThisDay === 0) return;
      if (formattedDate === sortedNetWorth[0].date_str) {
      } else {
         const args: NetWorthArgs = {
            balance: totalNetWorthThisDay,
            date_str: formattedDate,
         };
         dispatch(updateNetWorth(args));
         hasUpdated.current = true;
      }
   }, [accounts, dispatch, formattedDate, netWorth, updateNetWorth]);
   return (
      <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Users size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
         </div>
         <hr className="text-card border-2" />
         {isPending ? (
            <SkeletonCard />
         ) : accounts.length !== 0 ? (
            <ul className="flex flex-col gap-[0.6vw]">
               {accounts.map(({ balance, icon, name, id }) => {
                  const IconComponent =
                     accountIconMapp[icon as AccountIconTypes];

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
                           ₱{balance.toLocaleString()}
                        </h3>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <p className="text-[1vw] font-medium opacity-50 text-center py-[1vw]">
               You have no account
            </p>
         )}
      </div>
   );
};

export default Accounts;
