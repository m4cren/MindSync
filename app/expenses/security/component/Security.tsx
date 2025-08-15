"use client";
import setCookie from "@/actions/security/setCookie";
import verifyPin from "@/actions/security/verifyPin";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const Security = () => {
   const pinInputRef = useRef<HTMLInputElement | null>(null);

   const [isPending, setIsPending] = useState<boolean>(false);
   const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

   const router = useRouter();

   const validatePin = async (pin: string) => {
      setIsPending(true);
      try {
         const response = await verifyPin(pin);
         console.log(response);
         if (response) {
            setIsIncorrect(false);
            setCookie();
            setTimeout(() => {
               router.push("/expenses");
            }, 1000);
         } else {
            setIsIncorrect(true);
            setIsPending(false);
            return false;
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      pinInputRef.current?.focus();
      const enter = (e: KeyboardEvent) => {
         if (e.key === "Enter") {
            const pin = pinInputRef.current?.value;

            const parsedPin = pin ? pin : "";
            if (pin) {
               validatePin(parsedPin);
            }
         }
      };

      window.addEventListener("keydown", enter);
      return () => {
         window.removeEventListener("keydown", enter);
      };
   }, []);

   return (
      <div className="fixed bg-black/30 z-9 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 flex flex-col  items-center justify-around">
         <div className="flex flex-col items-center justify-center gap-[0.4vw]">
            <Lock size={200} />
            <p className="text-[2vw] font-semibold">Cash Flow</p>
         </div>
         <ul className="flex flex-col items-center gap-[2vw]">
            {!isPending ? (
               <input
                  type="password"
                  autoComplete="off"
                  ref={pinInputRef}
                  className="outline-none text-center tracking-wide ring-0 appearance-none bg-transparent border-[#d4d4d450] border-1 w-[15vw] py-[0.2vw] px-[1vw] rounded-[0.5vw]"
               />
            ) : (
               <span className="loading loading-dots loading-xl" />
            )}
            {isIncorrect && (
               <p className="text-[0.9vw] -mt-[1.5vw]">Invalid PIN</p>
            )}
         </ul>
         <p className="text-[1vw] opacity-60 menuToggleAnimation">Enter PIN</p>
      </div>
   );
};

export default Security;
