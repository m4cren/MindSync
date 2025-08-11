import { TooltipContentProps } from "recharts";

export const CustomTooltip = ({
   active,
   label,
   payload,
}: TooltipContentProps<number, string>) => {
   if (!active || !payload || payload.length === 0) return null;

   const data = payload[0] as { value: number };
   return (
      <div className="flex flex-col gap-[0.2vw] bg-card p-[0.5vw] rounded-[0.5vw]">
         <p className="text-[0.75vw] text-[#d4d4d440]">{label}</p>
         <p className="text-[0.9vw] text-[#d4d4d4] font-normal">
            ₱{data.value.toLocaleString()}
         </p>
      </div>
   );
};
