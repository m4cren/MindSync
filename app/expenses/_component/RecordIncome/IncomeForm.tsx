"use client";

import DropDownSelection from "@/app/component/DropDownSelection";
import { useOnlyAccount } from "@/lib/hooks/accounts/useOnlyAccount";
import { useRecordIncome } from "@/lib/hooks/income/useRecordIncome";
import { usePopupState } from "@/lib/hooks/popup/usePopupState";
import { AccountIconTypes, IncomeTypes } from "@/lib/types";
import { Calendar, Coins, Plus, UserCircle } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../Accounts/Accounts";
import ErrorMessage from "@/app/component/ErrorMessage";

const IncomeForm = () => {
   const { register, handleSubmit } = useForm<IncomeTypes>();
   const { untogglePopup } = usePopupState();
   const {
      accounts: { accounts },
      dispatch,
   } = useOnlyAccount();
   const { recordIncome } = useRecordIncome();
   const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
   const [errMsg, setErrMsg] = useState<string | null>(null);
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

      if (selectedAccount) {
         dispatch(
            recordIncome({
               ...data,
               date_str: data.date_str ? formFormattedDate : dateTodayFormatted,
               created_at: data.date_str ? dateObj : dateToday,
               acc_icon:
                  accounts.find(({ name }) => name === selectedAccount)?.icon ||
                  "card",
               received_in: selectedAccount,
            }),
         );

         dispatch(untogglePopup("recordIncome"));
      } else {
         setErrMsg("Please select an account");
         setTimeout(() => {
            setErrMsg(null);
         }, 5000);
      }
   };
   const [amountInput, setAmountInput] = useState<number>(0);
   const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
      setAmountInput(Number(e.target.value));
   };

   const accBalance = accounts.find(
      ({ name }) => name === selectedAccount,
   )?.balance;

   return (
      <form
         className="flex flex-col gap-[1vw] w-[22vw]"
         onSubmit={handleSubmit(onSubmit)}
      >
         <input
            autoComplete="off"
            type="text"
            {...register("income_stream")}
            placeholder="Where is the money from?"
            className="text-[1.5vw] font-semibold outline-none text-end "
         />
         <div className="flex items-center justify-between">
            <label
               htmlFor="account"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <UserCircle size={20} />
               Account
            </label>
            <DropDownSelection<string | null>
               selectionLabel="Select account"
               selectedItem={selectedAccount}
               type="dropdown"
            >
               <ul className="flex flex-col gap-[0.1vw]">
                  {accounts.map(({ icon, name, id }) => {
                     const AccountIcon =
                        accountIconMapp[icon as AccountIconTypes];
                     return (
                        <li
                           key={id}
                           onClick={() => {
                              setSelectedAccount(name);
                           }}
                           className="flex items-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] pl-[0.4vw] rounded-[0.4vw] transition duration-200"
                        >
                           <AccountIcon />
                           {name}
                        </li>
                     );
                  })}
               </ul>
            </DropDownSelection>
         </div>
         {errMsg && <ErrorMessage errMsg={errMsg} />}
         <div className="flex items-center justify-between  -mb-[0.8vw]">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               Current Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">
               ₱{accBalance?.toLocaleString()}
            </p>
         </div>

         <div className="flex items-center justify-between ">
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
               placeholder="$0"
               autoComplete="off"
               min={0}
               onChange={handleChangeAmount}
               className="outline-none text-end w-[6vw] text-[1vw] font-semibold appearance-none "
            />
         </div>
         <hr className=" opacity-20 -mt-[0.6vw]" />
         <div className="flex items-center justify-between  -mt-[0.8vw] ">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               New Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">
               {selectedAccount
                  ? `₱ ${(accBalance! + amountInput).toLocaleString()}`
                  : "Select account"}
            </p>
         </div>
         <div className="flex items-center justify-between ">
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
            className="cursor-pointer text-[0.9vw] py-[0.4vw] bg-[#2c2c2c] rounded-[0.6vw] flex flex-col items-center justify-center "
         >
            <Plus />
            Record
         </button>
      </form>
   );
};

export default IncomeForm;
