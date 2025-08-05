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

export type AccountTypes = {
   id?: string;
   name: string;
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
