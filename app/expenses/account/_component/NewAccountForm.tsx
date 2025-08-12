import DropDownSelection from "@/app/component/DropDownSelection";
import { useCreateAccount } from "@/lib/hooks/accounts/useCreateAccount";
import { AccountIconTypes, AccountTypes } from "@/lib/types";
import { CheckCircle, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { accountIconMapp } from "../../_component/Accounts/Accounts";
import ErrorMessage from "@/app/component/ErrorMessage";

export const iconOption: AccountIconTypes[] = [
   "bank",
   "card",
   "savings",
   "wallet",
];

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
   const [selectedIcon, setSelectedIcon] = useState<AccountIconTypes | null>(
      null,
   );
   const [errMsg, setErrMsg] = useState<string | null>(null);

   const onSubmit = (data: AccountTypes) => {
      if (data.name) {
         if (selectedIcon) {
            dispatch(
               createAccount({
                  ...data,
                  balance: 0,
                  total_expense: 0,
                  total_income: 0,
                  icon: selectedIcon,
               } as AccountTypes),
            );
            setIsNewAccount(false);
         } else {
            setErrMsg("Select an icon");
            setTimeout(() => {
               setErrMsg(null);
            }, 4000);
         }
      } else {
         setErrMsg("Provide a name");
         setTimeout(() => {
            setErrMsg(null);
         }, 4000);
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

               <DropDownSelection<AccountIconTypes | null>
                  selectionLabel="Select icon"
                  selectedItem={
                     selectedIcon
                        ? (capitalFirstLetter(selectedIcon) as AccountIconTypes)
                        : null
                  }
               >
                  <ul className="flex flex-col gap-[0.1vw]">
                     {iconOption.map((icon, id) => {
                        const AccountIcon =
                           accountIconMapp[icon as AccountIconTypes];
                        return (
                           <li
                              key={id}
                              onClick={() => {
                                 setSelectedIcon(icon);
                              }}
                              className="flex items-center gap-[0.3vw] hover:bg-[#d4d4d420] py-[0.4vw] pl-[0.4vw] rounded-[0.4vw] transition duration-200"
                           >
                              <AccountIcon />
                              {capitalFirstLetter(icon)}
                           </li>
                        );
                     })}
                  </ul>
               </DropDownSelection>
               {errMsg && <ErrorMessage errMsg={errMsg} />}
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
