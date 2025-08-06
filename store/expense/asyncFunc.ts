import { db } from "@/lib/firebase/client";
import { AccountTypes, ExpenseTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   addDoc,
   collection,
   doc,
   getDoc,
   getDocs,
   query,
   updateDoc,
   where,
} from "firebase/firestore";
import { fetchAccounts } from "../accounts/asyncFunc";

const expenseRef = collection(db, "expense");

export const fetchExpense = createAsyncThunk<ExpenseTypes[]>(
   "expense/fetchExpense",
   async () => {
      try {
         const snapshot = await getDocs(expenseRef);
         const expenses: ExpenseTypes[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
               id: doc.id,
               ...data,
            };
         }) as ExpenseTypes[];

         return expenses;
      } catch (error) {
         console.log(error);
         return [];
      }
   },
);

export const recordExpense = createAsyncThunk(
   "expense/recordExpense",
   async (data: ExpenseTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         updateAccountExpense(data);
         await addDoc(expenseRef, {
            ...data,
            amount: Number(data.amount),
         });
         dispatch(fetchAccounts());
         dispatch(fetchExpense());
      } catch (error) {
         console.log(error);
      }
   },
);

const updateAccountExpense = async (data: ExpenseTypes) => {
   const accountRef = collection(db, "accounts");
   const q = query(accountRef, where("name", "==", data.account));
   const accountToUpdate = await getDocs(q);

   if (!accountToUpdate.empty) {
      const docToUpdate = accountToUpdate.docs[0];

      const document: AccountTypes = {
         id: docToUpdate.id,
         ...docToUpdate.data(),
      } as AccountTypes;

      const accountToUpdateDoc = doc(accountRef, document.id);
      const newBalance = document.balance - Number(data.amount);
      const newExpense = document.total_expense + Number(data.amount);

      await updateDoc(accountToUpdateDoc, {
         balance: newBalance,
         total_expense: newExpense,
      });
   }
};
