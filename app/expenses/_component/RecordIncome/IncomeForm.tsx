"use client";

import { useAccountState } from "@/lib/hooks/accounts/useAccountState";
import { useOnlyAccount } from "@/lib/hooks/accounts/useOnlyAccount";
import { useIncomeState } from "@/lib/hooks/income/useIncomeState";
import { useRecordIncome } from "@/lib/hooks/income/useRecordIncome";
import { usePopupState } from "@/lib/hooks/popup/usePopupState";
import { AccountNameTypes, IncomeTypes } from "@/lib/types";
import { Calendar, Coins, Plus, UserCircle } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

export const accountOptions: AccountNameTypes[] = [
   "Wallet",
   "GCash",
   "GoTyme",
   "Emergency Funds",
   "Investment Funds",
];
const IncomeForm = () => {
   const { register, handleSubmit } = useForm<IncomeTypes>();
   const { untogglePopup } = usePopupState();
   const {
      accounts: { accounts },
      dispatch,
   } = useOnlyAccount();
   const { recordIncome } = useRecordIncome();

   const onSubmit = (data: IncomeTypes) => {
      const dateObj = new Date(data.date_str);

      const dateToday = new Date();

      const dateTodayFormatted = dateToday.toLocaleDateString("en-US", {
         month: "short",
         day: "2-digit",
         year: "numeric",
      });
      const formFormattedDate = dateObj.toLocaleDateString("en-US", {
         month: "short",
         day: "2-digit",
         year: "numeric",
      });

      dispatch(
         recordIncome({
            ...data,
            date_str: data.created_at ? formFormattedDate : dateTodayFormatted,
            created_at: data.created_at ? dateObj : dateToday,
         }),
      );

      dispatch(untogglePopup("recordIncome"));
   };
   const [amountInput, setAmountInput] = useState<number>(0);
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
            autoComplete="off"
            type="text"
            {...register("income_stream")}
            placeholder="Where is the money from?"
            className="text-[1.5vw] font-semibold outline-none text-end"
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
               {...register("received_in")}
               onChange={handleChangeAccount}
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
               type="number"
               id="amount"
               {...register("amount")}
               placeholder="$0.0"
               autoComplete="off"
               min={0}
               onChange={handleChangeAmount}
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
               ₱ {accBalance! + amountInput}
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

export default IncomeForm;
