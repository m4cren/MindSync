import { string } from "zod";

export type TaskFormTypes = {
   id?: string;
   label: string;
   category: string;
   date_str?: string;
   date?: Date | null;
};

export type PopupStateTypes = {
   menu: boolean;
   recordExpense: boolean;
   recordIncome: boolean;
   recordTransfer: boolean;
   recordHabit: boolean;
   addTask: boolean;
};
export type MenuStateTypes = {
   label: "Home" | "J.A.R.V.I.S" | "Daily Steps" | "Pocket Flow" | "Settings";
   href: "/" | "/jarvis" | "/routines" | "/expenses" | "/settings";
};
export type AccountStateTypes = {
   accounts: AccountTypes[];
   isPending: boolean;
   errMsg: string | null;
};

export type AccountNameTypes =
   | "Wallet"
   | "GoTyme"
   | "GCash"
   | "Emergency Funds"
   | "Investment Funds";

export type AccountTypes = {
   id?: string;
   name: AccountNameTypes;
   balance: number;
   total_income: number;
   total_expense: number;
};
export type NetWorthTypes = {
   id?: string;
   balance: number;
   date_str: string;
};

export type NetWorthStateTypes = {
   netWorth: NetWorthTypes[];
   isPending: boolean;
   errMsg: string | null;
};
export type NetWorthArgs = {
   balance: number;
   date_str: string;
};

export type FiltererTypes = "Month" | "Year" | null;

export type IncomeTypes = {
   id?: string;
   income_stream: string;
   amount: number;
   received_in: AccountNameTypes;
   date_str: string;
};

export type IncomeStateTypes = {
   income: IncomeTypes[];
   isPending: boolean;
   errMsg: string | null;
};
export type BudgetTypes =
   | "Food"
   | "Gas/Transportation"
   | "Gym"
   | "Utilities & Subscription"
   | "Leisures"
   | "Miscellaneous";

export type ExpenseTypes = {
   id?: string;
   account: AccountNameTypes;
   label: string;
   amount: number;
   category: BudgetTypes;
   date_str: string;
};
export type ExpenseStateTypes = {
   expense: ExpenseTypes[];
   isPending: boolean;
   errMsg: string | null;
};

export type TransferTypes = {
   id?: string;
   amount: number;
   from_acc: AccountNameTypes;
   to_acc: AccountNameTypes;
   date_str: string;
};

export type TransferStateTypes = {
   transfer: TransferTypes[];
   isPending: boolean;
   errMsg: string | null;
};
