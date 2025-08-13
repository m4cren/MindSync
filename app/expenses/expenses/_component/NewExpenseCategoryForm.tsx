"use client";
import ErrorMessage from "@/app/component/ErrorMessage";

import ConfirmationModal from "@/app/component/ConfirmationModal";
import { useActionExpenseCategory } from "@/lib/hooks/expense/useActionExpenseCategory";
import {
   expenseCategoryIconMap,
   ExpenseCategoryIconTypes,
   ExpenseCategoryTypes,
} from "@/lib/types";
import { CheckCircle, Trash, XCircleIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import IconSelection from "./IconSelection";
interface Props {
   setSelectedIcon: React.Dispatch<
      React.SetStateAction<ExpenseCategoryIconTypes | null>
   >;
   currentData?: { icon: string; label: string; alloc_per_month: number };
   expenseCategory: ExpenseCategoryTypes[];
   selectedIcon: ExpenseCategoryIconTypes | null;
   setIsAddNewCategory?: React.Dispatch<React.SetStateAction<boolean>>;
   setItemToEdit?: React.Dispatch<React.SetStateAction<string | null>>;
   id?: string;
}
const NewExpenseCategoryForm = ({
   id,
   selectedIcon,
   currentData,
   setItemToEdit,
   setSelectedIcon,
   setIsAddNewCategory,
   expenseCategory,
}: Props) => {
   const { register, handleSubmit } = useForm<ExpenseCategoryTypes>();
   const {
      addNewExpenseCategory,
      dispatch,
      editExpenseCategory,
      deleteExpenseCategory,
   } = useActionExpenseCategory();

   const [errMsg, setErrMsg] = useState<string | null>(null);

   const [existingLabels, setExistingLabels] = useState<
      { icon: string; label: string }[]
   >([]);
   const hasScan = useRef<boolean>(false);
   const CurrentIcon =
      expenseCategoryIconMap[currentData?.icon as ExpenseCategoryIconTypes];
   useEffect(() => {
      if (!hasScan.current) {
         if (currentData?.icon) {
            setSelectedIcon(currentData.icon as ExpenseCategoryIconTypes);
         }
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

      if (isDuplicate && !currentData?.label) {
         setErrMsg("Label already existing");
         setTimeout(() => {
            setErrMsg(null);
         }, 3000);
         return;
      }

      if (!currentData?.icon && setIsAddNewCategory) {
         dispatch(
            addNewExpenseCategory({
               ...data,
               icon: selectedIcon,
               alloc_per_month: Number(data.alloc_per_month),
            }),
         );
         setIsAddNewCategory(false);
      } else if (setItemToEdit) {
         dispatch(
            editExpenseCategory({
               ...data,
               id: id,
               alloc_per_month: Number(data.alloc_per_month),
            }),
         );
         setItemToEdit(null);
      }

      setSelectedIcon(null);
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
                  defaultValue={currentData?.label}
                  className="text-[1.1vw] font-semibold outline-none w-[9vw] "
                  placeholder={
                     setIsAddNewCategory ? "Category label" : currentData?.label
                  }
               />
               <input
                  type="number"
                  required
                  {...register("alloc_per_month")}
                  autoComplete="off"
                  min={10}
                  className="text-[0.8vw] font-normal outline-none w-[9vw] "
                  placeholder={
                     setIsAddNewCategory
                        ? "Budget per month"
                        : String(currentData?.alloc_per_month)
                  }
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
         <div className="flex flex-col items-end gap-[0.5vw]">
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
            {currentData && (
               <ConfirmationModal
                  label="Confirm that you wish to delete this category."
                  action={() => dispatch(deleteExpenseCategory(id!))}
                  sub_label={
                     <>
                        <CurrentIcon size={14} />
                        {currentData.label}
                     </>
                  }
               >
                  <Trash size={18} color="red" />
               </ConfirmationModal>
            )}
         </div>
      </form>
   );
};

export default NewExpenseCategoryForm;
