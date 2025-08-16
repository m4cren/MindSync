"use client";
import { useSettingsConfig } from "@/lib/hooks/settings/useSettingsConfig";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

const Form = () => {
   const {
      settings: { profile },
      isPending,
   } = useSettingsConfig();
   console.log(profile.username);
   return (
      <form action="" className="flex flex-col gap-[2vw]">
         {!isPending ? (
            <div className="relative flex flex-col gap-[0.7vw] ">
               <h5 className="font-semibold">Banner</h5>
               <Image
                  className=" rounded-[1vw] w-full h-[10rem] object-cover object-center"
                  src={`/images/banner/${profile.banner_url}`}
                  width={1920}
                  height={1080}
                  alt="banner"
                  unoptimized
               />
               <button className="absolute -bottom-[1vw] right-[5vw] bg-flame-secondary text-[0.7vw] rounded-[0.5vw] px-[0.6vw] py-[0.4vw] flex items-center justify-center gap-[0.3vw] font-semibold cursor-pointer">
                  <Pencil size={14} /> Change Banner
               </button>
            </div>
         ) : (
            <div className="relative flex flex-col gap-[0.7vw] ">
               <h5 className="font-semibold">Banner</h5>

               <div className=" rounded-[1vw] w-full h-[10rem] bg-[#2c2c2c] animate-pulse " />
            </div>
         )}

         <div className="flex flex-col gap-[1vw]">
            <div className="flex flex-col gap-[0.4vw]">
               <label htmlFor="" className=" font-semibold">
                  System name
               </label>
               <input
                  type="text"
                  defaultValue={!isPending ? profile.system_name : "Loading..."}
                  className="outline-none text-[1vw] font-semibold text-[#d4d4d490] border-2 py-[0.3vw] pl-[1vw] border-[#2c2c2c] rounded-[0.5vw] w-[40%]"
               />
            </div>
            <div className="flex flex-col gap-[0.4vw]">
               <label htmlFor="" className="font-semibold">
                  Username
               </label>
               <input
                  type="text"
                  defaultValue={!isPending ? profile.username : "Loading..."}
                  className="outline-none text-[1vw] font-semibold text-[#d4d4d490] border-2 py-[0.3vw] pl-[1vw] border-[#2c2c2c] rounded-[0.5vw] w-[40%]"
               />
            </div>
            <button className="bg-flame-secondary cursor-pointer rounded-[0.4vw] px-[1vw] py-[0.3vw] w-[18%] text-[0.9vw] font-semibold mt-[1.5vw]">
               Save Changes
            </button>
         </div>
      </form>
   );
};

export default Form;
