import { HandCoins } from "lucide-react";
import BudgetCard from "./BudgetCard";

const budgetAllocation = [
   { label: "Food", alloted_budget: 1000, total_expense: 450 },
   { label: "Gas/Transportation", alloted_budget: 1000, total_expense: 450 },
   { label: "Gym", alloted_budget: 1000, total_expense: 450 },
   {
      label: "Utilities & Subscription",
      alloted_budget: 1000,
      total_expense: 450,
   },
   { label: "Leisures", alloted_budget: 1000, total_expense: 450 },
   { label: "Miscellaneous", alloted_budget: 1000, total_expense: 450 },
];

const MonthlyBudget = () => {
   return (
      <div className="flex flex-col gap-[1vw] w-full h-fit border-2 border-card rounded-[0.5vw] p-[1.25vw]">
         <div className="flex items-center gap-[0.6vw]">
            <HandCoins size={18} />

            <h1 className="text-[0.9vw] font-medium opacity-50">
               Monthly Budget
            </h1>
         </div>
         <hr className="text-card border-2" />
         <ul className="grid grid-cols-3 gap-[1.2vw]">
            {budgetAllocation.map(
               ({ alloted_budget, label, total_expense }, key) => (
                  <BudgetCard
                     key={key}
                     label={label}
                     alloted_budget={alloted_budget}
                     total_expense={total_expense}
                  />
               ),
            )}
         </ul>
      </div>
   );
};

export default MonthlyBudget;
