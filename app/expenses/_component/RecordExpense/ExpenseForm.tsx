"use client";
import { AccountNameTypes, BudgetTypes, ExpenseTypes } from "@/lib/types";
import { Calendar, Coins, Logs, Plus, UserCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
const budgetCategories: BudgetTypes[] = [
   "Food",
   "Gas/Transportation",
   "Gym",
   "Leisures",
   "Utilities & Subscription",
   "Miscellaneous",
];

const accountOptions: AccountNameTypes[] = [
   "Wallet",
   "GCash",
   "GoTyme",
   "Emergency Funds",
   "Investment Funds",
];
const ExpenseForm = () => {
   const { register, handleSubmit } = useForm<ExpenseTypes>();
   return (
      <form className="flex flex-col gap-[1vw]" action="">
         <input
            type="text"
            placeholder="Where did the money go?"
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
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="acunt"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Coins size={20} />
               Amount
            </label>
            <input
               type="number"
               placeholder="$0.0"
               className="outline-none text-end w-[6vw] text-[1vw] font-semibold appearance-none "
            />
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
               className="outline-none border-1 border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            />
         </div>
         <button className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center w-[22vw]">
            <Plus />
            Record
         </button>
      </form>
   );
};

export default ExpenseForm;
