import React from "react";

const Markers = ({ position }: { position: string }) => {
   return (
      <span
         className={`w-1 h-2 rounded-b-2xl bg-[#ececec40] absolute ${position} -translate-y-1/2 -translate-x-1/2`}
      ></span>
   );
};

export default Markers;
