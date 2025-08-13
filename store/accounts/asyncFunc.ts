import { db } from "@/lib/firebase/client";
import { AccountTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   updateDoc,
} from "firebase/firestore";

const accountRef = collection(db, "accounts");

export const deleteAccount = createAsyncThunk(
   "account/deleteAccount",
   async (id: string, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         const accToDelete = doc(accountRef, id);
         await deleteDoc(accToDelete);

         dispatch(fetchAccounts());
      } catch (error) {
         console.log(error);
      }
   },
);

export const editAccount = createAsyncThunk(
   "account/editAccount",
   async (data: AccountTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         const accToUpdate = doc(accountRef, data.id);

         await updateDoc(accToUpdate, data);
         dispatch(fetchAccounts());
      } catch (error) {
         console.log(error);
      }
   },
);

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

export const createAccount = createAsyncThunk(
   "account/createAccount",
   async (data: AccountTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         await addDoc(accountRef, data);

         dispatch(fetchAccounts());
      } catch (error) {
         console.log(error);
      }
   },
);
