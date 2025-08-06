import { db } from "@/lib/firebase/client";
import { AccountTypes, TransferTypes } from "@/lib/types";
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

const transferRef = collection(db, "transfer");

export const fetchTransfer = createAsyncThunk<TransferTypes[]>(
   "transfer/fetchTransfer",
   async () => {
      try {
         const snapshot = await getDocs(transferRef);
         const transfers: TransferTypes[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
               id: doc.id,
               ...data,
            };
         }) as TransferTypes[];

         return transfers;
      } catch (error) {
         console.log(error);
         return [];
      }
   },
);

export const recordTransfer = createAsyncThunk(
   "transfer/recordTransfer",
   async (data: TransferTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         handleAccountTransfer(data);

         await addDoc(transferRef, {
            ...data,
            amount: Number(data.amount),
         });
         dispatch(fetchTransfer());
         dispatch(fetchAccounts());
      } catch (error) {
         console.log(error);
      }
   },
);
const handleAccountTransfer = async (data: TransferTypes) => {
   const accountRef = collection(db, "accounts");
   const from_q = query(accountRef, where("name", "==", data.from_acc));
   const to_q = query(accountRef, where("name", "==", data.to_acc));
   const fromAccToUpdate = await getDocs(from_q);
   const toAccToUpdate = await getDocs(to_q);

   if (!fromAccToUpdate.empty && !toAccToUpdate.empty) {
      const docFromAccToUpdate = fromAccToUpdate.docs[0];
      const docToAccToUpdate = toAccToUpdate.docs[0];

      const fromDocument: AccountTypes = {
         id: docFromAccToUpdate.id,
         ...docFromAccToUpdate.data(),
      } as AccountTypes;
      const toDocument: AccountTypes = {
         id: docToAccToUpdate.id,
         ...docToAccToUpdate.data(),
      } as AccountTypes;

      const fromAccountToUpdateDoc = doc(accountRef, fromDocument.id);
      const toAccountToUpdateDoc = doc(accountRef, toDocument.id);

      const fromAccNewBalance = fromDocument.balance - Number(data.amount);
      const fromAccNewExpense =
         fromDocument.total_expense + Number(data.amount);
      const toAccNewBalance = toDocument.balance + Number(data.amount);
      const toAccNewIncome = toDocument.total_income + Number(data.amount);

      await updateDoc(fromAccountToUpdateDoc, {
         balance: fromAccNewBalance,
         total_expense: fromAccNewExpense,
      });
      await updateDoc(toAccountToUpdateDoc, {
         balance: toAccNewBalance,
         total_income: toAccNewIncome,
      });
   }
};
