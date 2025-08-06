import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup, untogglePopup } from "@/store/popup/popupSlice";
import { fetchTasks, addTask, finishTask } from "@/store/tasks/asyncFunc";
import { fetchAccounts } from "@/store/accounts/asyncFunc";
import { fetchNetWorth, updateNetWorth } from "@/store/netWorth/asyncFunc";
import { fetchIncome, recordIncome } from "@/store/income/asyncFunc";
import { fetchExpense, recordExpense } from "@/store/expense/asyncFunc";
import { fetchTransfer, recordTransfer } from "@/store/transfer/asyncFunc";
import { useEffect } from "react";

export const useGlobalState = () => {
   const popup = useSelector((state: RootState) => state.popup);
   const tasks = useSelector((state: RootState) => state.tasks);
   const dispatch = useDispatch<AppDispatch>();
   const accounts = useSelector((state: RootState) => state.account);
   const netWorth = useSelector((state: RootState) => state.netWorth);
   const income = useSelector((state: RootState) => state.income);
   const expense = useSelector((state: RootState) => state.expense);
   const transfer = useSelector((state: RootState) => state.transfer);

   useEffect(() => {
      dispatch(fetchTasks());
      dispatch(fetchAccounts());
      dispatch(fetchNetWorth());
      dispatch(fetchIncome());
      dispatch(fetchExpense());
      dispatch(fetchTransfer());
   }, []);

   return {
      dispatch,
      popupState: { togglePopup, popup, untogglePopup },
      taskState: { tasks, fetchTasks, addTask, finishTask },
      accountState: { accounts },
      netWorthState: { netWorth, updateNetWorth },
      incomeState: { income, recordIncome },
      expenseState: { expense, recordExpense },
      transferState: { transfer, recordTransfer },
   };
};
