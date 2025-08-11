import { Metadata } from "next";

import { Suspense } from "react";
import SkeletonPage from "./_component/SkeletonPage";
import Header from "./_component/Header";
import Dashboard from "./_component/Dashboard";
import Accounts from "./_component/Accounts/Accounts";
import MonthlyBudget from "./_component/MonthlyBudget/MonthlyBudget";
import Chart from "./_component/NetWorth/Chart";

const page = () => {
   return (
      <Suspense fallback={<SkeletonPage />}>
         <>
            <Header
               label="Finance Tracker"
               quote={`"Increase your income, Increase your savings, Increase your investment returns, Decrease your expenses"`}
            />
            <hr className="text-card border-2" />

            <div className="grid grid-cols-[22vw_1fr]">
               <div className="flex flex-col gap-[2vw]">
                  <Dashboard />
                  <Accounts />
               </div>

               <div className="flex flex-col gap-[2vw]">
                  <MonthlyBudget />
                  <Chart />
               </div>
            </div>
         </>
      </Suspense>
   );
};

export default page;
export const metadata: Metadata = {
   title: "MindSync | Expense Tracker",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
