import { db } from "@/lib/firebase/client";
import { TaskSchema } from "@/lib/rules";
import { TaskFormTypes } from "@/lib/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   where,
} from "firebase/firestore";

const taskRef = collection(db, "tasks");

export const fetchTasks = createAsyncThunk<TaskFormTypes[]>(
   "tasks/fetchTasks",
   async () => {
      const snapshot = await getDocs(taskRef);

      const tasks: TaskFormTypes[] = snapshot.docs.map((doc) => {
         const data = doc.data();

         return {
            id: doc.id,
            ...data,
         };
      }) as TaskFormTypes[];

      return tasks;
   },
);

export const addTask = createAsyncThunk(
   "tasks/addTask",
   async (taskData: TaskFormTypes, thunkAPI) => {
      const { dispatch } = thunkAPI;
      const validatedForm = TaskSchema.safeParse(taskData);

      if (validatedForm.success) {
         await addDoc(taskRef, taskData);

         await dispatch(fetchTasks());
      } else {
         console.log(validatedForm.error.message);
      }
   },
);

export const finishTask = createAsyncThunk(
   "tasks/finishTask",
   async (id: string, thunkAPI) => {
      const { dispatch } = thunkAPI;

      const docRef = doc(taskRef, id);

      if (id) {
         await deleteDoc(docRef);

         await dispatch(fetchTasks());
      }
   },
);
