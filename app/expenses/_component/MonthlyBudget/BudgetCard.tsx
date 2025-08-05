import { BudgetTypes } from "@/lib/types";
import {
   AlertCircle,
   Dumbbell,
   Fuel,
   LucideIcon,
   PartyPopper,
   Podcast,
   Utensils,
   VenetianMask,
} from "lucide-react";
import React from "react";
const AllotedBudgetMap = {
   Food: 1000,
   "Gas/Transportation": 2000,
   Gym: 1500,
   "Utilities & Subscription": 3000,
   Leisures: 500,
   Miscellaneous: 400,
};
export const budgetIconMap: Record<BudgetTypes, LucideIcon> = {
   Food: Utensils,
   "Gas/Transportation": Fuel,
   Gym: Dumbbell,
   "Utilities & Subscription": Podcast,
   Leisures: PartyPopper,
   Miscellaneous: VenetianMask,
};
interface Props {
   category: BudgetTypes;

   amount: number;
}
const BudgetCard = ({ category, amount }: Props) => {
   const IconComponent = budgetIconMap[category];

   const percentage = ((amount / AllotedBudgetMap[category]) * 100).toFixed(0);
   return (
      <li className="bg-card p-[1vw] rounded-[0.6vw] flex flex-col gap-[0.4vw]">
         <div className="flex items-center gap-[0.6vw]">
            <IconComponent size={16} />
            <h3 className="text-[1.1vw] font-bold">{category}</h3>
         </div>
         <div className="flex items-center gap-[0.6vw]">
            <p className="text-[0.8vw] font-medium opacity-60">
               Alloted budget:
            </p>
            <h4 className="text-[0.9vw] font-light opacity-80">
               ₱{AllotedBudgetMap[category]}
            </h4>
         </div>
         {parseInt(percentage) > 100 ? (
            <p className="flex items-center gap-[0.4vw] text-[0.8vw] w-fit px-[1.2vw] py-[0.25vw] rounded-[0.4vw] bg-red-500/20 text-center">
               Total budget exceeded
               <AlertCircle size={12} />
            </p>
         ) : (
            <div className="flex items-center gap-[0.6vw]">
               <p className="text-[0.8vw] font-bold opacity-60">
                  {percentage}%
               </p>
               <div className=" bg-flame/20 w-full  rounded-full ">
                  <div
                     style={{ width: `${percentage}%` }}
                     className={`bg-flame/70  py-[0.23vw] rounded-full`}
                  ></div>
               </div>
            </div>
         )}
         <h4 className="text-[0.9vw] font-bold">₱{amount}</h4>
      </li>
   );
};

export default BudgetCard;
