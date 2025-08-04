import React from "react";
import Header from "../_component/Header";

import Dashboard from "../_component/Dashboard";

const page = () => {
   return (
      <>
         <Header label="Expenses" />
         <hr className="text-card border-2" />
         <div className="grid grid-cols-[22vw_1fr]">
            <div className="flex flex-col gap-[2vw]">
               <Dashboard />
            </div>

            <div className="flex flex-col gap-[2vw]"></div>
         </div>
      </>
   );
};

export default page;
