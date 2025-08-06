import { db } from "@/lib/firebase/client";
import { AccountTypes, IncomeTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   addDoc,
   collection,
   doc,
   getDocs,
   query,
   updateDoc,
   where,
} from "firebase/firestore";
import { fetchAccounts } from "../accounts/asyncFunc";

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

export const recordIncome = createAsyncThunk(
   "income/recordIncome",
   async (data: IncomeTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         updateAccountIncome(data);

         await addDoc(incomeRef, { ...data, amount: Number(data.amount) });
         dispatch(fetchIncome());
         dispatch(fetchAccounts());
      } catch (error) {
         console.log(error);
      }
   },
);

const updateAccountIncome = async (data: IncomeTypes) => {
   const accountRef = collection(db, "accounts");
   const q = query(accountRef, where("name", "==", data.received_in));
   const accountToUpdate = await getDocs(q);

   if (!accountToUpdate.empty) {
      const docToUpdate = accountToUpdate.docs[0];

      const document: AccountTypes = {
         id: docToUpdate.id,
         ...docToUpdate.data(),
      } as AccountTypes;

      const accountToUpdateDoc = doc(accountRef, document.id);
      const newBalance = document.balance + Number(data.amount);
      const newIncome = document.total_income + Number(data.amount);

      await updateDoc(accountToUpdateDoc, {
         balance: newBalance,
         total_income: newIncome,
      });
   }
};
