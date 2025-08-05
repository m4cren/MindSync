import React from "react";
import Header from "../_component/Header";

import Dashboard from "../_component/Dashboard";
import ExpenseHistory from "./_component/ExpenseHistory";

const page = () => {
   return (
      <>
         <Header
            label="Expenses"
            quote={`“Every expense is a decision — a choice that speaks volumes about your priorities. Track wisely, spend intentionally, and let every peso support the life you truly want to live.”`}
         />
         <hr className="text-card border-2" />
         <div className="grid grid-cols-[22vw_1fr]">
            <div className="flex flex-col gap-[2vw]">
               <Dashboard />
            </div>

            <ExpenseHistory />
         </div>
      </>
   );
};

export default page;
