import { db } from "@/lib/firebase/client";
import { SettingsConfigType } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";

const settingsConfigRef = collection(db, "settings_config");

export const initializeSettingsConfig =
   createAsyncThunk<SettingsConfigType | null>(
      "initialize/settingsConfig",
      async () => {
         const initialConfig = {
            config: {
               profile: {
                  banner_url: "banner.gif",
                  system_name: "MindSync",
                  username: "User",
               },
               appearance: {
                  theme: "dark",
                  time_format: "12-hour",
               },
               accessibility: {
                  animation: "on",
                  font: "Inter",
               },
               keybinds: {
                  add_task: ["ctrl", "0"],
                  menu: ["ctrl", "alt"],
                  record_habit: ["ctrl", "4"],
                  record_expense: ["ctrl", "1"],
                  record_income: ["ctrl", "2"],
                  record_transfer: ["ctrl", "3"],
                  toggle_close: ["ctrl", "."],
               },
            },
         };
         try {
            const snap = await getDocs(settingsConfigRef);

            const settingsConfig = snap.docs[0];
            if (snap.empty) {
               await addDoc(settingsConfigRef, initialConfig);

               return initialConfig.config;
            }

            if (settingsConfig.exists()) {
               return settingsConfig.data().config;
            }
         } catch (error) {
            console.log(error);
            return initialConfig.config;
         }
      },
   );
