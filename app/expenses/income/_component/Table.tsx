import {
   Banknote,
   BanknoteArrowDown,
   Calendar,
   Coins,
   Funnel,
   LucideIcon,
   Scroll,
} from "lucide-react";

import { AccountIconTypes, IncomeTypes } from "@/lib/types";
import { accountIconMapp } from "../../_component/Accounts/Accounts";

const incomeHistoryHeader: { label: string; icon: LucideIcon }[] = [
   { label: "Income Stream", icon: Banknote },
   { label: "Amount", icon: Coins },
   { label: "Received In", icon: BanknoteArrowDown },
   { label: "Date", icon: Calendar },
];

const Table = ({ sortedByDate }: { sortedByDate: IncomeTypes[] }) => {
   return (
      <table>
         <thead>
            <tr>
               {incomeHistoryHeader.map(({ icon, label }, key) => {
                  const IconComponent = icon;
                  return (
                     <th key={key} className="py-[0.6vw] px-[0.5vw]">
                        <span className="flex items-center gap-[0.3vw] text-[0.9vw] font-medium opacity-80">
                           <IconComponent size={15} />
                           {label}
                        </span>
                     </th>
                  );
               })}
            </tr>
         </thead>
         <tbody>
            {sortedByDate.map(
               ({
                  amount,
                  date_str,
                  income_stream,
                  received_in,
                  id,
                  acc_icon,
               }) => {
                  const IconComponent =
                     accountIconMapp[acc_icon as AccountIconTypes];
                  return (
                     <tr key={id} className="text-[0.9vw] ">
                        <td className="border-t-2 border-b-2 border-card py-[0.5vw] px-[1vw]">
                           {income_stream}
                        </td>
                        <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                           ₱{amount}
                        </td>
                        <td className="border-2 py-[0.5vw] px-[1vw] border-card">
                           <span className="flex items-center gap-[0.4vw]">
                              <IconComponent size={16} />
                              {received_in}
                           </span>
                        </td>
                        <td className="border-t-2  border-b-2 border-card py-[0.5vw] px-[1vw]">
                           {date_str}
                        </td>
                     </tr>
                  );
               },
            )}
         </tbody>
      </table>
   );
};

export default Table;
