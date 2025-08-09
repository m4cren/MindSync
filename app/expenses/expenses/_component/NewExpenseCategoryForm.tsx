"use client";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React from "react";
import IconSelection from "./IconSelection";
import { ExpenseCategoryIconTypes, ExpenseCategoryTypes } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useAddNewExpenseCategory } from "@/lib/hooks/expense/useAddNewExpenseCategory";
interface Props {
   setIconSelection: React.Dispatch<React.SetStateAction<boolean>>;
   isIconSelection: boolean;
   setSelectedIcon: React.Dispatch<
      React.SetStateAction<ExpenseCategoryIconTypes | null>
   >;
   selectedIcon: ExpenseCategoryIconTypes | null;
   setIsAddNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewExpenseCategoryForm = ({
   isIconSelection,
   selectedIcon,
   setIconSelection,
   setSelectedIcon,
   setIsAddNewCategory,
}: Props) => {
   const { register, handleSubmit } = useForm<ExpenseCategoryTypes>();
   const { addNewExpenseCategory, dispatch } = useAddNewExpenseCategory();

   const onSubmit = (data: ExpenseCategoryTypes) => {
      if (data && selectedIcon) {
         dispatch(addNewExpenseCategory({ ...data, icon: selectedIcon }));
         setIsAddNewCategory(false);
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="relative  border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]"
      >
         <div className="flex flex-col items-start gap-[0.5vw]">
            <input
               type="text"
               {...register("label")}
               autoComplete="off"
               className="text-[1.1vw] font-semibold outline-none w-[9vw] "
               placeholder="Category label"
            />
            <input
               type="number"
               {...register("alloc_per_month")}
               autoComplete="off"
               className="text-[0.8vw] font-normal outline-none w-[9vw] "
               placeholder="Budget per month"
            />

            <IconSelection
               isIconSelection={isIconSelection}
               selectedIcon={selectedIcon}
               setIconSelection={setIconSelection}
               setSelectedIcon={setSelectedIcon}
            />
         </div>
         <div className="flex flex-col gap-[0.5vw]">
            <button type="submit" className="cursor-pointer text-green-500/70">
               <CheckCircle size={20} />
            </button>
            <button
               type="button"
               onClick={() => setIsAddNewCategory(false)}
               className="cursor-pointer opacity-40"
            >
               <XCircleIcon size={20} />
            </button>
         </div>
      </form>
   );
};

export default NewExpenseCategoryForm;
