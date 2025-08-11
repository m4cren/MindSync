import { ChevronDown, ChevronLeft } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props<TSelected> {
   selectionLabel: string;
   selectedItem?: TSelected;
   children: ReactNode;
   icon?: ReactNode;
}

export default function DropDownSelection<TSelected>({
   selectedItem,
   selectionLabel,
   children,
   icon,
}: Props<TSelected>) {
   const [isSelection, setIsSelection] = useState<boolean>(false);
   return (
      <button
         type="button"
         className="relative  cursor-pointer border-1 w-fit min-w-[10vw] border-[#d4d4d430] rounded-[0.35vw] px-[1vw] text-[0.9vw] py-[0.25vw]"
      >
         <span
            onClick={() => setIsSelection(!isSelection)}
            className="flex items-center  gap-[0.8vw] justify-between"
         >
            {icon ? icon : selectedItem ? String(selectedItem) : selectionLabel}

            {!isSelection ? <ChevronDown /> : <ChevronLeft />}
         </span>
         {isSelection && (
            <div
               onClick={() => setIsSelection(false)}
               className="shadow-xl drop-down-open-animation absolute top-full right-0 z-5 w-[14vw] p-[0.8vw] bg-[#2c2c2c] rounded-[0.5vw]"
            >
               {children}
            </div>
         )}
      </button>
   );
}
