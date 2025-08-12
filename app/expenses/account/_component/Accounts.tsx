"use client";

import { useOnlyAccount } from "@/lib/hooks/accounts/useOnlyAccount";
import { Plus, Users } from "lucide-react";
import { useState } from "react";

import { accountIconMapp } from "../../_component/Accounts/Accounts";
import CardSkeleton from "../../_component/CardSkeleton";
import NewAccountForm from "./NewAccountForm";
import AccountCard from "./AccountCard";

const Accounts = () => {
   const { accounts } = useOnlyAccount();

   const [isNewAccount, setIsNewAccount] = useState<boolean>(false);

   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Users size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
         </div>
         <hr className="text-card border-2" />

         {accounts.isPending ? (
            <CardSkeleton />
         ) : (
            <ul className="grid grid-cols-3 gap-[1.2vw]">
               {accounts.accounts.map(
                  ({
                     balance,
                     name,
                     id,
                     icon,
                     total_expense,
                     total_income,
                  }) => (
                     <AccountCard
                        balance={balance}
                        name={name}
                        icon={icon}
                        id={id!}
                        key={id}
                        total_expense={total_expense}
                        total_income={total_income}
                     />
                  ),
               )}
               {isNewAccount ? (
                  <NewAccountForm setIsNewAccount={setIsNewAccount} />
               ) : (
                  <li
                     onClick={() => setIsNewAccount(true)}
                     className="cursor-pointer active:bg-transparent hover:bg-card transition duration-100 border-card border-3 p-[1.3vw] rounded-[0.6vw] flex items-center justify-center gap-[0.4vw]"
                  >
                     <Plus size={25} opacity={0.3} />
                     <h3 className="text-[1.1vw] opacity-30 font-medium">
                        New Account
                     </h3>
                  </li>
               )}
            </ul>
         )}
      </div>
   );
};

export default Accounts;
