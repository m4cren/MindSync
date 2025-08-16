import { db } from "@/lib/firebase/client";
import { SettingsConfigType } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

const settingsConfigRef = collection(db, "settings_config");

export const initializeSettingsConfig =
   createAsyncThunk<SettingsConfigType | null>(
      "initialize/settingsConfig",
      async () => {
         try {
            const snap = await getDocs(settingsConfigRef);

            const settingsConfig = snap.docs[0];

            if (settingsConfig.exists()) {
               return settingsConfig.data().config;
            }
         } catch (error) {
            console.log(error);
            return {};
         }
      },
   );
