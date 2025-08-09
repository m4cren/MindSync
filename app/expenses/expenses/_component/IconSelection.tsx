import { expenseCategoryIconMap, ExpenseCategoryIconTypes } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
const categoryIconOptions: ExpenseCategoryIconTypes[] = [
   "Childcare",
   "Clothing",
   "Donations",
   "Education",
   "Emergency",
   "Entertainment",
   "Food",
   "Fun",
   "Groceries",
   "Gym",
   "Hobbies",
   "Insurance",
   "Internet",
   "Loans",
   "Medical",
   "Miscellaneous",
   "Pets",
   "Rent",
   "Subscription",
   "Transportation",
   "Travel",
   "Utilities",
];

interface Props {
   setIconSelection: React.Dispatch<React.SetStateAction<boolean>>;
   isIconSelection: boolean;
   setSelectedIcon: React.Dispatch<
      React.SetStateAction<ExpenseCategoryIconTypes | null>
   >;
   selectedIcon: ExpenseCategoryIconTypes | null;
   existingLabels: { icon: string; label: string }[];
}
const IconSelection = ({
   selectedIcon,
   setIconSelection,
   setSelectedIcon,
   isIconSelection,
   existingLabels,
}: Props) => {
   const uniqueIcons = categoryIconOptions.filter(
      (icons) => !existingLabels.some(({ icon }) => icon === icons),
   );
   return (
      <div>
         <button
            onClick={() => setIconSelection(true)}
            type="button"
            className="flex items-center gap-[0.5vw] cursor-pointer"
         >
            {isIconSelection ? <ChevronRight /> : <ChevronDown />}
            {selectedIcon ? selectedIcon : "Select an icon"}
         </button>
         {isIconSelection && (
            <ul className="absolute z-5 gap-[0.7vw] bg-[#2c2c2c] grid grid-cols-4 w-[16vw] h-fit rounded-[0.4vw] p-[1vw]">
               {uniqueIcons.map((icon, key) => {
                  const IconComponent =
                     expenseCategoryIconMap[icon as ExpenseCategoryIconTypes];
                  return (
                     <li
                        key={key}
                        onClick={() => {
                           setIconSelection(false);
                           setSelectedIcon(icon);
                        }}
                        className="flex items-center justify-center cursor-pointer hover:scale-110 opacity-80 hover:opacity-100 transition duration-100"
                     >
                        <IconComponent />
                     </li>
                  );
               })}
            </ul>
         )}
      </div>
   );
};

export default IconSelection;
