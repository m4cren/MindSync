import { Metadata } from "next";
import Security from "./security/component/Security";
import Main from "./_component/Main";
import Image from "next/image";

const page = () => {
   return (
      <>
         <Image
            src={"/images/banner/banner.gif"}
            width={1920}
            height={1080}
            alt="banner"
            className="w-full h-[15vw] object-cover object-center"
         />

         <Main />
      </>
   );
};

export default page;
export const metadata: Metadata = {
   title: "MindSync | Expense Tracker",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
