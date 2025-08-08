"use client";
import { useOnlyExpenseCategory } from "@/lib/hooks/expense/useOnlyExpenseCategory";
import { expenseCategoryIconMap, ExpenseCategoryIconTypes } from "@/lib/types";

const ExpenseCategory = () => {
   const {
      expenseCategory: { expenseCategory, isPending },
   } = useOnlyExpenseCategory();
   return (
      <div
         className="flex flex-col gap-[1vw] w-[20vw] h-fit
             border-2 border-card rounded-[0.5vw] p-[1.25vw]"
      >
         <p className="text-[0.9vw] font-medium opacity-50">Expense Category</p>
         <hr className="text-card border-2" />
         <ul className="flex flex-col gap-[0.8vw]">
            {isPending ? (
               <li className="bg-card rounded-[0.4vw] p-[1vw] h-[12vw]"></li>
            ) : (
               expenseCategory.map(({ alloc_per_month, icon, label, id }) => {
                  const IconComponent =
                     expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];
                  return (
                     <li
                        key={id}
                        className="flex flex-col gap-[0.4vw] bg-card rounded-[0.4vw] p-[1vw]"
                     >
                        <div className="flex items-center gap-[0.1vw]">
                           <IconComponent size={20} />
                           <h3 className="font-semibold px-[0.5vw] py-[0.1vw] text-[1vw] rounded-[0.4vw]">
                              {label}
                           </h3>
                        </div>
                        <p className="text-[0.8vw] opacity-75 font-medium">
                           Allocated Budget: ₱{alloc_per_month}
                        </p>
                     </li>
                  );
               })
            )}
         </ul>
      </div>
   );
};

export default ExpenseCategory;
