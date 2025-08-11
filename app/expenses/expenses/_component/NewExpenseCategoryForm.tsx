"use client";
import ErrorMessage from "@/app/component/ErrorMessage";
import { useAddNewExpenseCategory } from "@/lib/hooks/expense/useAddNewExpenseCategory";
import { ExpenseCategoryIconTypes, ExpenseCategoryTypes } from "@/lib/types";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import IconSelection from "./IconSelection";
interface Props {
   setSelectedIcon: React.Dispatch<
      React.SetStateAction<ExpenseCategoryIconTypes | null>
   >;
   currentData?: { icon: string; label: string };
   expenseCategory: ExpenseCategoryTypes[];
   selectedIcon: ExpenseCategoryIconTypes | null;
   setIsAddNewCategory?: React.Dispatch<React.SetStateAction<boolean>>;
   setItemToEdit?: React.Dispatch<React.SetStateAction<string | null>>;
}
const NewExpenseCategoryForm = ({
   selectedIcon,
   currentData,
   setItemToEdit,
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

      dispatch(
         addNewExpenseCategory({
            ...data,
            icon: selectedIcon,
            alloc_per_month: Number(data.alloc_per_month),
         }),
      );
      if (setIsAddNewCategory) {
         setIsAddNewCategory(false);
         setSelectedIcon(null);
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="relative  border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]"
      >
         <div className="flex flex-col items-start gap-[0.85vw]">
            <div>
               <input
                  type="text"
                  {...register("label")}
                  required
                  autoComplete="off"
                  className="text-[1.1vw] font-semibold outline-none w-[9vw] "
                  placeholder={
                     setIsAddNewCategory ? "Category label" : "New label"
                  }
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
            </div>
            <IconSelection
               existingLabels={existingLabels}
               currentData={currentData}
               selectedIcon={selectedIcon}
               setSelectedIcon={setSelectedIcon}
            />
            {errMsg && <ErrorMessage errMsg={errMsg} />}
         </div>
         <div className="flex flex-col gap-[0.85vw]">
            <button type="submit" className="cursor-pointer text-green-500/70">
               <CheckCircle size={25} />
            </button>
            <button
               type="button"
               onClick={() => {
                  if (setIsAddNewCategory) {
                     setIsAddNewCategory(false);
                  } else if (setItemToEdit) {
                     setItemToEdit(null);
                  }
               }}
               className="cursor-pointer opacity-40"
            >
               <XCircleIcon size={25} />
            </button>
         </div>
      </form>
   );
};

export default NewExpenseCategoryForm;
