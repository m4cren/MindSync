"use client";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
   expenseCategory: ExpenseCategoryTypes[];
   selectedIcon: ExpenseCategoryIconTypes | null;
   setIsAddNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewExpenseCategoryForm = ({
   isIconSelection,
   selectedIcon,
   setIconSelection,
   setSelectedIcon,
   setIsAddNewCategory,
   expenseCategory,
}: Props) => {
   const { register, handleSubmit } = useForm<ExpenseCategoryTypes>();
   const { addNewExpenseCategory, dispatch } = useAddNewExpenseCategory();

   const [errMsg, setErrMsg] = useState<string | null>(null);

   const [existingLabels, setExistingLabels] = useState<
      { icon: string; label: string }[]
   >([]);
   const hasScan = useRef<boolean>(false);

   useEffect(() => {
      if (!hasScan.current) {
         setExistingLabels(() =>
            expenseCategory.map(({ icon, label }) => {
               return { icon: icon, label: label };
            }),
         );
         hasScan.current = true;
      }
   }, []);

   const onSubmit = (data: ExpenseCategoryTypes) => {
      if (!selectedIcon) {
         setErrMsg("Please select an icon");
         setTimeout(() => {
            setErrMsg(null);
         }, 3000);
         return;
      }

      const isDuplicate = existingLabels.some(
         ({ label }) => data.label.toLowerCase() === label.toLowerCase(),
      );

      if (isDuplicate) {
         setErrMsg("Label already existing");
         setTimeout(() => {
            setErrMsg(null);
         }, 3000);
         return;
      }

      dispatch(addNewExpenseCategory({ ...data, icon: selectedIcon }));
      setIsAddNewCategory(false);
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
               required
               autoComplete="off"
               className="text-[1.1vw] font-semibold outline-none w-[9vw] "
               placeholder="Category label"
            />
            <input
               type="number"
               required
               {...register("alloc_per_month")}
               autoComplete="off"
               min={10}
               className="text-[0.8vw] font-normal outline-none w-[9vw] "
               placeholder="Budget per month"
            />

            <IconSelection
               existingLabels={existingLabels}
               isIconSelection={isIconSelection}
               selectedIcon={selectedIcon}
               setIconSelection={setIconSelection}
               setSelectedIcon={setSelectedIcon}
            />
            {errMsg && (
               <p className="bg-red-600/30 px-[0.4vw] py-[0.1vw] text-center rounded-[0.2vw] text-[0.7vw]">
                  {errMsg}
               </p>
            )}
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
