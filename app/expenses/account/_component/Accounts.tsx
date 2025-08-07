"use client";

import { useOnlyAccount } from "@/lib/hooks/accounts/useOnlyAccount";
import { Check, CheckCircle, Plus, Users, XCircleIcon } from "lucide-react";
import { accountIconMap } from "../../_component/Accounts/Accounts";
import CardSkeleton from "../../_component/CardSkeleton";
import { useState } from "react";

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
               {accounts.accounts.map(({ balance, name, id }) => {
                  const IconComponent = accountIconMap[name];

                  return (
                     <li
                        key={id}
                        className="bg-card p-[1.3vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]"
                     >
                        <div className="flex items-center gap-[0.6vw]">
                           <IconComponent size={20} />
                           <h3 className="text-[1.1vw] font-bold">{name}</h3>
                        </div>
                        <p className="text-[1vw] opacity-70">₱{balance}</p>
                     </li>
                  );
               })}
               {isNewAccount ? (
                  <li className="  border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]">
                     <div className="flex flex-col items-start gap-[0.5vw]">
                        <input
                           type="text"
                           className="text-[1.1vw] font-medium outline-none w-[9vw] "
                           placeholder="Account name"
                        />

                        <select
                           defaultValue={"Icon"}
                           className="border-2 border-card text-[0.8vw] max-w-[6vw] px-[0.5vw] py-[0.3vw] rounded-[0.4vw]"
                           id="select-icon"
                        >
                           <option disabled>Icon</option>
                           <option>Card</option>
                           <option>Bank</option>
                           <option>Wallet</option>
                           <option>Others</option>
                        </select>
                     </div>
                     <div className="flex flex-col gap-[0.5vw]">
                        <button
                           onClick={() => setIsNewAccount(false)}
                           className="cursor-pointer text-green-500/70"
                        >
                           <CheckCircle size={20} />
                        </button>
                        <button
                           onClick={() => setIsNewAccount(false)}
                           className="cursor-pointer opacity-40"
                        >
                           <XCircleIcon size={20} />
                        </button>
                     </div>
                  </li>
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
