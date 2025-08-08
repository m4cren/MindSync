import React from "react";

const ExpenseCategory = () => {
   return (
      <div
         className="flex flex-col gap-[1vw] w-[20vw] h-fit
             border-2 border-card rounded-[0.5vw] p-[1.25vw]"
      >
         <p className="text-[0.9vw] font-medium opacity-50">Expense Category</p>
         <hr className="text-card border-2" />
         <ul className="flex flex-col gap-[0.8vw]"></ul>
      </div>
   );
};

export default ExpenseCategory;
