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
