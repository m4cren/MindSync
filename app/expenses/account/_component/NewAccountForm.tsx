import { useCreateAccount } from "@/lib/hooks/accounts/useCreateAccount";
import { AccountIconTypes, AccountTypes } from "@/lib/types";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const iconOption: AccountIconTypes[] = ["bank", "card", "savings", "wallet"];

export const capitalFirstLetter = (word: string) => {
   return word.charAt(0).toUpperCase() + word.slice(1);
};
interface Props {
   setIsNewAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAccountForm = ({ setIsNewAccount }: Props) => {
   const {
      register,
      handleSubmit,
      formState: { isLoading },
   } = useForm<AccountTypes>();

   const { createAccount, dispatch } = useCreateAccount();

   const onSubmit = (data: AccountTypes) => {
      if (data) {
         dispatch(
            createAccount({
               ...data,
               balance: 0,
               total_expense: 0,
               total_income: 0,
            } as AccountTypes),
         );
         setIsNewAccount(false);
      }
   };

   if (isLoading) {
      return (
         <li className="  border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-center gap-[0.6vw]">
            <span className="loading loading-dots" />
         </li>
      );
   } else {
      return (
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="  border-card border-3 p-[0.8vw] rounded-[0.6vw] flex items-center justify-around gap-[0.6vw]"
         >
            <div className="flex flex-col items-start gap-[0.5vw]">
               <input
                  type="text"
                  autoComplete="off"
                  {...register("name")}
                  className="text-[1.1vw] font-medium outline-none w-[9vw] "
                  placeholder="Account name"
               />

               <select
                  {...register("icon")}
                  className="border-2 cursor-pointer border-card text-[0.8vw] max-w-[6vw] px-[0.5vw] py-[0.3vw] rounded-[0.4vw]"
                  id="select-icon"
               >
                  {iconOption.map((item) => (
                     <option value={item} key={item} className="cursor-pointer">
                        {capitalFirstLetter(item)}
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex flex-col gap-[0.5vw]">
               <button
                  type="submit"
                  className="cursor-pointer text-green-500/70"
               >
                  <CheckCircle size={20} />
               </button>
               <button
                  type="button"
                  onClick={() => setIsNewAccount(false)}
                  className="cursor-pointer opacity-40"
               >
                  <XCircleIcon size={20} />
               </button>
            </div>
         </form>
      );
   }
};

export default NewAccountForm;
