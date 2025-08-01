import React from "react";
import type { Day } from "@/lib/hooks/useCalendar";

const DayCell: React.FC<{ day: Day }> = ({ day }) => {
   const classes = [
      "p-[0.4vw] text-center rounded-[0.5vw] text-[1.1vw]",
      day.isCurrentMonth ? "text-[#d4d4d4]" : "text-[#d4d4d440]",
      day.isToday
         ? "bg-[#d4d4d4] font-semibold text-card"
         : "hover:bg-[#d4d4d4]",
   ].join(" ");

   return <div className={classes}>{day.date.getDate()}</div>;
};

export default DayCell;
