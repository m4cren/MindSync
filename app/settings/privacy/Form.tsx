"use client";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Form = () => {
   const [isPasswordShown, setIsPasswordShown] = useState<{
      oldPass: boolean;
      newPass: boolean;
   }>({ oldPass: false, newPass: false });
   return (
      <form className="flex flex-col gap-[1vw]">
         <div className="flex flex-col gap-[0.4vw]">
            <label htmlFor="" className=" font-semibold">
               Finance tracker old PIN
            </label>
            <div className="relative  w-fit">
               <input
                  type={isPasswordShown.oldPass ? "text" : "password"}
                  className="outline-none text-[1vw] font-semibold text-[#d4d4d490] border-2 py-[0.3vw] pl-[1vw] border-[#2c2c2c] rounded-[0.5vw] w-[18rem]"
               />
               <span
                  onClick={() =>
                     setIsPasswordShown({
                        ...isPasswordShown,
                        oldPass: !isPasswordShown.oldPass,
                     })
                  }
                  className="cursor-pointer absolute top-1/2 right-1 scale-75 opacity-80 -translate-x-1/2 -translate-y-1/2"
               >
                  {!isPasswordShown.oldPass ? <Eye /> : <EyeOff />}
               </span>
            </div>
         </div>
         <div className="flex flex-col gap-[0.4vw]">
            <label htmlFor="" className="font-semibold">
               Finance tracker new PIN
            </label>
            <div className="relative  w-fit">
               <input
                  type={isPasswordShown.newPass ? "text" : "password"}
                  className="outline-none text-[1vw] font-semibold text-[#d4d4d490] border-2 py-[0.3vw] pl-[1vw] border-[#2c2c2c] rounded-[0.5vw] w-[18rem]"
               />
               <span
                  onClick={() =>
                     setIsPasswordShown({
                        ...isPasswordShown,
                        newPass: !isPasswordShown.newPass,
                     })
                  }
                  className="cursor-pointer absolute top-1/2 right-1 scale-75 opacity-80 -translate-x-1/2 -translate-y-1/2"
               >
                  {!isPasswordShown.newPass ? <Eye /> : <EyeOff />}
               </span>
            </div>
         </div>
         <button className="bg-flame-secondary cursor-pointer rounded-[0.4vw] px-[1vw] py-[0.3vw] w-[18%] text-[0.9vw] font-semibold mt-[1.5vw]">
            Change PIN
         </button>
      </form>
   );
};

export default Form;
