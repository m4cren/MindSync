import { Users, Wallet } from "lucide-react";
import React from "react";

const Accounts = () => {
   return (
      <div className="flex flex-col gap-[1vw] w-[20vw] h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <Users size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">Accounts</h1>
         </div>
         <hr className="text-card border-2" />
         <ul className="flex flex-col gap-[0.6vw]">
            <li className="flex flex-col gap-[0.6vw] bg-card rounded-[0.6vw] p-[1vw]">
               <div className="flex items-center gap-[0.4vw]">
                  <Wallet size={15} />
                  <h4 className="text-[1vw] font-bold">Wallet</h4>
               </div>
               <h3 className="text-[1.2vw] opacity-80 font-medium">$30</h3>
            </li>
            <li className="flex flex-col gap-[0.6vw] bg-card rounded-[0.6vw] p-[1vw]">
               <div className="flex items-center gap-[0.4vw]">
                  <Wallet size={15} />
                  <h4 className="text-[1vw] font-bold">Wallet</h4>
               </div>
               <h3 className="text-[1.2vw] opacity-80 font-medium">$30</h3>
            </li>
            <li className="flex flex-col gap-[0.6vw] bg-card rounded-[0.6vw] p-[1vw]">
               <div className="flex items-center gap-[0.4vw]">
                  <Wallet size={15} />
                  <h4 className="text-[1vw] font-bold">Wallet</h4>
               </div>
               <h3 className="text-[1.2vw] opacity-80 font-medium">$30</h3>
            </li>
            <li className="flex flex-col gap-[0.6vw] bg-card rounded-[0.6vw] p-[1vw]">
               <div className="flex items-center gap-[0.4vw]">
                  <Wallet size={15} />
                  <h4 className="text-[1vw] font-bold">Wallet</h4>
               </div>
               <h3 className="text-[1.2vw] opacity-80 font-medium">$30</h3>
            </li>
         </ul>
      </div>
   );
};

export default Accounts;
