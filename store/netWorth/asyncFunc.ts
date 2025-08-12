import { db } from "@/lib/firebase/client";
import { NetWorthArgs, NetWorthTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";

const netWorthRef = collection(db, "netWorth");
const dateToday = new Date();

export const initializeNetWorth = createAsyncThunk(
   "netWorth/initializeNetWorth",
   async () => {
      try {
         const snapshot = await getDocs(netWorthRef);
         const existingNetWorth = snapshot.docs;

         if (existingNetWorth.length <= 0) {
            const formattedDate = dateToday.toLocaleDateString("en-US", {
               month: "short",
               day: "2-digit",
               year: "numeric",
            });
            await addDoc(netWorthRef, {
               balance: 0,
               date_str: formattedDate,
            });
         } else {
            return;
         }
      } catch (error) {
         console.log(error);
      }
   },
);

export const fetchNetWorth = createAsyncThunk<NetWorthTypes[]>(
   "netWorth/fetchNetWorth",
   async () => {
      try {
         const snapshot = await getDocs(netWorthRef);
         const netWorth: NetWorthTypes[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
               id: doc.id,
               ...data,
            };
         }) as NetWorthTypes[];

         return netWorth;
      } catch (error) {
         console.log(error);
         return [];
      }
   },
);

export const updateNetWorth = createAsyncThunk<string, NetWorthArgs>(
   "netWorth/updateNetWorth",
   async ({ balance, date_str }, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
         await addDoc(netWorthRef, { balance, date_str });

         dispatch(fetchNetWorth());
         return "Success updating";
      } catch (error) {
         console.log(error);
         return "Error updating Net Worth";
      }
   },
);
