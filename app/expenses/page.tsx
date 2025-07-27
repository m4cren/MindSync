import { Metadata } from "next";
import React from "react";

const page = () => {
   return (
      <div className="flex items-center justify-center w-screen h-screen">
         <h1 className="text-2xl">Expense Tracker In Progress</h1>
      </div>
   );
};

export default page;
export const metadata: Metadata = {
   title: "MindSync | Expense Tracker",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
