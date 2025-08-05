import { db } from "@/lib/firebase/client";
import { IncomeTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

const incomeRef = collection(db, "income");

export const fetchIncome = createAsyncThunk<IncomeTypes[]>(
   "income/fetchIncome",
   async () => {
      try {
         const snapshot = await getDocs(incomeRef);
         const incomes: IncomeTypes[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
               id: doc.id,
               ...data,
            };
         }) as IncomeTypes[];

         return incomes;
      } catch (error) {
         console.log(error);
         return [];
      }
   },
);
