import React from "react";
import Header from "../_component/Header";

import Dashboard from "../_component/Dashboard";
import IncomeHistory from "./_component/IncomeHistory";

const page = () => {
   return (
      <>
         <Header
            label="Income"
            quote={`“Every source of income is a building block toward your future. Whether big or small, consistent or rare, your income represents your value, your effort, and your potential to create lasting impact.”`}
         />
         <hr className="text-card border-2" />
         <div className="grid grid-cols-[22vw_1fr]">
            <div className="flex flex-col gap-[2vw]">
               <Dashboard />
            </div>

            <IncomeHistory />
         </div>
      </>
   );
};

export default page;
