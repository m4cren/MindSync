import { db } from "@/lib/firebase/client";
import { AccountTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

const accountRef = collection(db, "accounts");

export const fetchAccounts = createAsyncThunk<AccountTypes[]>(
   "accounts/fetchAccounts",
   async () => {
      try {
         const snapshot = await getDocs(accountRef);

         const accounts: AccountTypes[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
               id: doc.id,
               ...data,
            };
         }) as AccountTypes[];

         return accounts;
      } catch (error) {
         console.log(error);
         return [];
      }
   },
);
