import { Metadata } from "next";

const page = () => {
   return (
      <div className="flex items-center justify-center w-screen h-screen">
         <h1 className="text-2xl">Settings</h1>
      </div>
   );
};

export default page;
export const metadata: Metadata = {
   title: "MindSync | Setings",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
