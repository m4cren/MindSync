"use client";
import React, { useEffect, useState } from "react";
import HourHand from "./HourHand";
import MinuteHand from "./MinuteHand";
import SecondsHand from "./SecondsHand";
import Markers from "./Markers";
import DateTime from "./Date&Time";
import CenterDot from "./CenterDot";
import useTime from "@/lib/hooks/useTime";
import Skeleton from "./Skeleton";

const markerPositions = [
   "top-0 left-1/2",
   "top-[100%] left-1/2",
   "rotate-90  top-1/2 left-0",
   "rotate-90  top-1/2 left-[100%]",
];

const Clock = () => {
   const [isClient, setIsClient] = useState(false);
   const { amPm, day, hours, minute, seconds } = useTime();
   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) return <Skeleton />;

   const second_angle = Number(seconds) * 6;
   const minute_angle = Number(minute) * 6;
   const hours_angle = Number(hours) * 30;
   return (
      <div className={` w-fit flex flex-col items-center  `}>
         <div className="aspect-square scale-80 flex justify-center ">
            <div
               style={{ border: "0.3vw solid #ececec90" }}
               className="relative overflow-hidden rounded-full  shadow-xl  bg-[rgba(0,0,0,0.35)] [box-shadow:0_0_15px_rgba(0,0,0,0.7)] w-[25vw] h-[25vw]  flex"
            >
               <CenterDot />
               <MinuteHand rotation={minute_angle} />
               <HourHand rotation={hours_angle} />
               <SecondsHand rotation={second_angle} />

               {markerPositions.map((pos, index) => (
                  <Markers position={pos} key={index} />
               ))}
            </div>
         </div>
         <DateTime day={day} amPm={amPm} hour={hours} minute={minute} />
      </div>
   );
};

export default Clock;
