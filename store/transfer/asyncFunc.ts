import { db } from "@/lib/firebase/client";
import { TransferTypes } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

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
