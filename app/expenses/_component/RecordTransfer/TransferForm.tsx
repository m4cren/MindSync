import { Calendar, Coins, Plus, Send, UserCircle, Wallet } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { accountOptions } from "../RecordIncome/IncomeForm";
import { AccountNameTypes, TransferTypes } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useGlobalState } from "@/lib/hooks/useGlobalState";

const TransferForm = () => {
   const {
      dispatch,
      popupState: { untogglePopup },
      transferState: { recordTransfer },
      accountState: {
         accounts: { accounts },
      },
   } = useGlobalState();
   const { register, handleSubmit } = useForm<TransferTypes>();

   const onSubmit = (data: TransferTypes) => {
      if (data && data.date_str) {
         const dateObj = new Date(data.date_str);

         const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
         });
         dispatch(
            recordTransfer({
               ...data,
               date_str: formattedDate,
               created_at: dateObj,
            }),
         );

         dispatch(untogglePopup("recordTransfer"));
      }
   };
   const [amountInput, setAmountInput] = useState<number>(0);
   const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setAmountInput(value);
   };

   const [selectedAccount, setSelectedAccount] = useState<{
      from_acc: AccountNameTypes;
      to_acc: AccountNameTypes;
   }>({ from_acc: "Wallet", to_acc: "Investment Funds" });

   const handleChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedAccount({
         ...selectedAccount,
         [e.target.name]: e.target.value,
      });
   };
   useEffect(() => {
      console.log(selectedAccount);
   }, [selectedAccount]);

   const fromAccBalance = accounts.find(
      ({ name }) => name === selectedAccount.from_acc,
   )?.balance;
   const toAccBalance = accounts.find(
      ({ name }) => name === selectedAccount.to_acc,
   )?.balance;
   return (
      <form
         className="flex flex-col gap-[1.5vw]"
         onSubmit={handleSubmit(onSubmit)}
      >
         <div className="flex items-center justify-between w-[22vw]">
            <input
               type="number"
               {...register("amount")}
               onChange={handleChangeAmount}
               autoComplete="off"
               min={0}
               max={fromAccBalance}
               className="text-[1.5vw] font-semibold outline-none w-[22vw]"
               placeholder="Amount to transfer ₱0"
            />
         </div>
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="from_acc"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Send size={20} />
               From Account
            </label>
            <select
               {...register("from_acc")}
               onChange={handleChangeAccount}
               value={selectedAccount.from_acc}
               id="from_acc"
               className="border-1 w-[10vw] border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            >
               {accountOptions.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         </div>

         <div className="flex items-center justify-between w-[22vw] -mt-[1vw]">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               Current Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">₱{fromAccBalance}</p>
         </div>
         <hr className="w-[22vw] opacity-20 -mt-[1vw]" />
         <div className="flex items-center justify-between w-[22vw] -mt-[1vw] ">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               New Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">
               ₱ {fromAccBalance! - amountInput}
            </p>
         </div>
         <div className="flex items-center justify-between w-[22vw]">
            <label
               htmlFor="to_acc"
               className="text-[1vw] opacity-75 flex items-center gap-[0.4vw]"
            >
               <Wallet size={20} />
               To Account
            </label>
            <select
               {...register("to_acc")}
               onChange={handleChangeAccount}
               value={selectedAccount.to_acc}
               id="to_acc"
               className="border-1 w-[10vw] border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
            >
               {accountOptions.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         </div>
         <div className="flex items-center justify-between w-[22vw] -mt-[1vw]">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               Current Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">₱{toAccBalance}</p>
         </div>
         <hr className="w-[22vw] opacity-20 -mt-[1vw]" />
         <div className="flex items-center justify-between w-[22vw] -mt-[1vw] ">
            <label
               htmlFor="amount"
               className="text-[0.85vw] opacity-50 flex items-center gap-[0.4vw]"
            >
               New Balance:
            </label>
            <p className="text-[0.85vw] opacity-50">
               ₱ {toAccBalance! + amountInput}
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

export default TransferForm;
