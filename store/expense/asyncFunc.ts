import { db } from "@/lib/firebase/client";
import { ExpenseTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

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
