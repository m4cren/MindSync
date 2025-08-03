import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "./asyncFunc";
import { TaskFormTypes } from "@/lib/types";

type TaskType = {
   tasks: TaskFormTypes[];
   isLoading: boolean;
   error?: string | null;
};

const initialState: TaskType = {
   tasks: [],
   isLoading: true,
   error: null,
};

export const taskSlice = createSlice({
   name: "tasks",
   initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(
            fetchTasks.fulfilled,
            (state, action: PayloadAction<TaskFormTypes[]>) => {
               console.log(action.payload);
               state.isLoading = false;
               state.tasks = action.payload;
            },
         )
         .addCase(fetchTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? "Failed to fetch tasks";
         });
   },
});

export default taskSlice.reducer;
