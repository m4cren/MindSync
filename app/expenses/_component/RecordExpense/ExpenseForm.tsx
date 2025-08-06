"use client";
import { AccountNameTypes, BudgetTypes, ExpenseTypes } from "@/lib/types";
import { Calendar, Coins, Logs, Plus, UserCircle } from "lucide-react";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { accountOptions } from "../RecordIncome/IncomeForm";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
const budgetCategories: BudgetTypes[] = [
   "Food",
   "Gas/Transportation",
   "Gym",
   "Leisures",
   "Utilities & Subscription",
   "Miscellaneous",
];

const ExpenseForm = () => {
   const {
      dispatch,
      popupState: { untogglePopup },
      expenseState: { recordExpense },
      accountState: {
         accounts: { accounts, isPending },
      },
   } = useGlobalState();
   const { register, handleSubmit } = useForm<ExpenseTypes>();

   const [amountInput, setAmountInput] = useState<number>(0);

   const onSubmit = (data: ExpenseTypes) => {
      if (data && data.date_str) {
         const dateObj = new Date(data.date_str);

         const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
         });
         dispatch(recordExpense({ ...data, date_str: formattedDate }));
         dispatch(untogglePopup("recordExpense"));
      }
   };

   const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
      setAmountInput(Number(e.target.value));
   };

   const [selectedAccount, setSelectedAccount] =
      useState<AccountNameTypes>("Wallet");

   const handleChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as AccountNameTypes;
      setSelectedAccount(value);
   };

   const accBalance = accounts.find(
      ({ name }) => name === selectedAccount,
   )?.balance;
   return (
      <form
         className="flex flex-col gap-[1vw]"
         onSubmit={handleSubmit(onSubmit)}
      >
         <input
            type="text"
            autoComplete="off"
            {...register("label")}
            placeholder="Where did the money go?"
            required
            className="text-[1.5vw] font-semibold outline-none"
         />
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="account"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <UserCircle size={20} />
               Account
            </label>
            <select
               {...register("account")}
               id="account"
               value={selectedAccount}
               onChange={handleChangeAccount}
               className="border-1 w-[10vw] border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            >
               {accountOptions.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         </div>
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="category"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Logs size={20} />
               Category
            </label>
            <select
               {...register("category")}
               id="category"
               className="border-1 w-[10vw] border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            >
               {budgetCategories.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         </div>
         <div className="flex items-center justify-between w-[22vw] -mb-[0.8vw]">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               Current Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">₱{accBalance}</p>
         </div>
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="amount"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Coins size={20} />
               Amount
            </label>
            <input
               {...register("amount")}
               type="number"
               onChange={handleChangeAmount}
               inputMode="numeric"
               autoComplete="off"
               min={0}
               max={
                  accounts.find(({ name }) => name === selectedAccount)?.balance
               }
               placeholder="₱0"
               required
               className="outline-none text-end w-[6vw] text-[1vw] font-semibold appearance-none "
            />
         </div>
         <hr className="w-[22vw] opacity-20 -mt-[0.6vw]" />
         <div className="flex items-center justify-between w-[22vw] -mt-[0.8vw] ">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               New Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">
               ₱ {accBalance! - amountInput}
            </p>
         </div>
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="date"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Calendar size={20} />
               Date
            </label>
            <input
               {...register("date_str")}
               type="date"
               id="date"
               required
               className="outline-none border-1 border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            />
         </div>
         <button
            type="submit"
            className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center w-[22vw]"
         >
            <Plus />
            Record
         </button>
      </form>
   );
};

export default ExpenseForm;
