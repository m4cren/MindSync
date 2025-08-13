import DropDownSelection from "@/app/component/DropDownSelection";
import { AccountIconTypes, AccountTypes } from "@/lib/types";
import { CheckCircle, Pencil, Trash, XIcon } from "lucide-react";
import { useState } from "react";
import { accountIconMapp } from "../../_component/Accounts/Accounts";
import { capitalFirstLetter, iconOption } from "./NewAccountForm";
import { useForm } from "react-hook-form";
import { useCreateAccount } from "@/lib/hooks/accounts/useCreateAccount";
import ErrorMessage from "@/app/component/ErrorMessage";
import ConfirmationModal from "@/app/component/ConfirmationModal";

const AccountCard = ({
   balance,
   icon,
   name,
   id,
   total_expense,
   total_income,
}: AccountTypes) => {
   const { editAccount, dispatch, deleteAccount } = useCreateAccount();
   const [isEditMode, setIsEditMode] = useState<string | null>(null);
   const [selectedIcon, setSelectedIcon] = useState<AccountIconTypes | null>(
      null,
   );
   const IconComponent = accountIconMapp[icon];
   const [errMsg, setErrMsg] = useState<string | null>(null);
   const { register, handleSubmit } = useForm<AccountTypes>();
   const onSubmit = (data: AccountTypes) => {
      if (data.name) {
         if (selectedIcon) {
            dispatch(
               editAccount({
                  ...data,
                  id: id,
                  total_expense: Number(total_expense),
                  total_income: Number(total_income),
                  icon: selectedIcon,
                  balance: Number(balance),
               }),
            );
            setIsEditMode(null);
         } else {
            setErrMsg("Select an icon");
            setTimeout(() => {
               setErrMsg(null);
            }, 4000);
         }
      } else {
         setErrMsg("Provide account name");
         setTimeout(() => {
            setErrMsg(null);
         }, 4000);
      }
   };
   if (!isEditMode) {
      return (
         <li
            key={id}
            className="bg-card p-[1.3vw] rounded-[0.6vw] flex flex-row justify-between items-center"
         >
            <div className="flex flex-col gap-[0.4vw]">
               <div className="flex items-center gap-[0.6vw]">
                  <IconComponent size={20} />
                  <h3 className="text-[1.1vw] font-bold">{name}</h3>
               </div>
               <p className="text-[1vw] opacity-70">
                  ₱{balance.toLocaleString()}
               </p>
            </div>
            <button
               onClick={() => setIsEditMode(id!)}
               className="cursor-pointer"
            >
               <Pencil size={18} />
            </button>
         </li>
      );
   } else {
      return (
         <form
            key={id}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card p-[1.3vw] rounded-[0.6vw] flex flex-row justify-between items-center"
         >
            <div className="flex flex-col gap-[0.4vw]">
               <input
                  type="text"
                  placeholder={name}
                  defaultValue={name}
                  {...register("name")}
                  className="outline-none font-bold w-full"
               />
               <DropDownSelection<AccountIconTypes | null>
                  selectionLabel="Select icon"
                  type="dropdown"
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
            <div className="flex flex-col gap-[0.4vw] items-end">
               <button type="submit" className="cursor-pointer">
                  <CheckCircle color="green" size={18} />
               </button>
               <button
                  onClick={() => setIsEditMode(null)}
                  type="button"
                  className="cursor-pointer"
               >
                  <XIcon size={18} />
               </button>
               <ConfirmationModal
                  action={() => dispatch(deleteAccount(id!))}
                  label="Are you sure you want to delete this account?"
                  sub_label={
                     <>
                        <IconComponent />
                        {name}
                     </>
                  }
               >
                  <Trash size={15} color="red" />
               </ConfirmationModal>
            </div>
         </form>
      );
   }
};

export default AccountCard;
