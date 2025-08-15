"use client";

import ErrorMessage from "@/app/component/ErrorMessage";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputPinContainer from "./InputPinContainer";

interface Props {
   action: "new" | "change";
}
export type PasswordFormType = {
   oldPIN: string;
   newPIN: string;
   confirmPIN?: string;
};
export type PasswordInputType = {
   oldPIN: boolean;
   newPIN: boolean;
   confirmPIN?: boolean;
};
const Form = ({ action }: Props) => {
   const [isPasswordShown, setIsPasswordShown] = useState<PasswordInputType>({
      oldPIN: false,
      newPIN: false,
      confirmPIN: false,
   });
   const [errMsg, setErrMsg] = useState<string | null>(null);
   const [isPending, setIsPending] = useState<boolean>(false);
   const { register, handleSubmit, reset } = useForm<PasswordFormType>();

   const onSubmit = (data: PasswordFormType) => {
      setIsPending(true);
      if (data.newPIN === data.oldPIN || data.newPIN === data.confirmPIN) {
         if (data.newPIN.length <= 5) {
            setErrMsg("PIN should be more than 5 characters");
            setIsPending(false);
         } else {
            const sendPin = async () => {
               try {
                  if (action === "new") {
                     await axios.post("/api/create_pin", { pin: data.newPIN });
                  } else {
                     const res = await axios.post("/api/change_pin", {
                        pin: data.oldPIN,
                        newPin: data.confirmPIN,
                     });
                     if (!res.data.status) {
                        setErrMsg(res.data.msg);
                        setIsPending(false);
                        return;
                     }
                  }
                  reset();
                  setIsPending(false);
                  window.location.href = "/";
               } catch (error) {
                  console.log(error);
               }
            };
            sendPin();
         }
      } else {
         setErrMsg("PIN do not match");
         setIsPending(false);
      }
      setTimeout(() => {
         setErrMsg(null);
      }, 4000);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col gap-[1vw]"
      >
         <InputPinContainer
            action={action}
            isPasswordShown={isPasswordShown}
            label="oldPIN"
            register={register}
            setIsPasswordShown={setIsPasswordShown}
         />
         <InputPinContainer
            isPasswordShown={isPasswordShown}
            label="newPIN"
            register={register}
            action={action}
            setIsPasswordShown={setIsPasswordShown}
         />
         {action === "change" && (
            <InputPinContainer
               isPasswordShown={isPasswordShown}
               label="confirmPIN"
               action={action}
               register={register}
               setIsPasswordShown={setIsPasswordShown}
            />
         )}
         {errMsg && (
            <div className="w-[20vw]">
               <ErrorMessage errMsg={errMsg} />
            </div>
         )}
         <button
            type="submit"
            className="bg-flame-secondary cursor-pointer rounded-[0.4vw] px-[1vw] py-[0.3vw] w-[18%] text-[0.9vw] font-semibold mt-[1.5vw]"
         >
            {isPending ? (
               <span className="loading loading-infinity text-center" />
            ) : action === "change" ? (
               " Change PIN"
            ) : (
               "Confirm"
            )}
         </button>
      </form>
   );
};

export default Form;
