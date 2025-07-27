import React from "react";

const DateTime = ({
   day,
   amPm,
   hour,
   minute,
   second,
}: {
   day: number;
   amPm: string;
   hour: number;
   minute: string;
   second: string;
}) => {
   return (
      <div className="flex flex-row items-center mt-40 w-[35%] justify-around">
         <h1 className=" text-[3.25rem] font-light text-shadow-md">
            {hour}:{minute}:
            <span className="text-white/50 font-extralight text-[2.5rem]">
               {second} {amPm}
            </span>{" "}
         </h1>
         <p className="text-[rgba(255,255,255,0.6)] font-light text-shadow-md text-[2.65rem]">
            {day === 1
               ? " Monday"
               : day === 2
                 ? " Tuesday"
                 : day === 3
                   ? " Wednesday"
                   : day === 4
                     ? " Thursday"
                     : day === 5
                       ? " Friday"
                       : day === 6
                         ? " Saturday"
                         : day === 0
                           ? " Sunday"
                           : null}
         </p>
      </div>
   );
};

export default DateTime;
