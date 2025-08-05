"use client";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { Users } from "lucide-react";
import { accountIconMap } from "../../_component/Accounts/Accounts";
import CardSkeleton from "../../_component/CardSkeleton";

const Accounts = () => {
   const {
      accountState: { accounts },
   } = useGlobalState();

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
            </ul>
         )}
      </div>
   );
};

export default Accounts;
