import React from "react";
import Header from "../_component/Header";

import Dashboard from "../_component/Dashboard";
import Accounts from "./_component/Accounts";
import Details from "./_component/Details";

const page = () => {
   return (
      <>
         <Header label="Accounts" />
         <hr className="text-card border-2" />
         <div className="grid grid-cols-[22vw_1fr]">
            <div className="flex flex-col gap-[2vw]">
               <Dashboard />
            </div>

            <div className="flex flex-col gap-[2vw]">
               <Accounts />
               <Details />
            </div>
         </div>
      </>
   );
};

export default page;
