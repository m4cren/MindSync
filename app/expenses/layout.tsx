import Image from "next/image";
import { PropsWithChildren } from "react";
import RecordExpense from "./_component/RecordExpense/RecordExpense";
import RecordIncome from "./_component/RecordIncome/RecordIncome";
import RecordTransfer from "./_component/RecordTransfer/RecordTransfer";
import { ShowAmountProvider } from "@/lib/context/showAmountProvider";

const layout = ({ children }: PropsWithChildren) => {
   return (
      <main className="flex flex-col  w-screen h-fit min-h-screen pb-[20vw]">
         <Image
            src={"/images/banner/banner.gif"}
            width={1920}
            height={1080}
            alt="banner"
            unoptimized
            className="w-full h-[15vw] object-cover object-center"
         />
         <RecordExpense />
         <RecordIncome />
         <RecordTransfer />
         <section className="flex flex-col gap-[2vw] px-[8vw]">
            <ShowAmountProvider>{children}</ShowAmountProvider>
         </section>
      </main>
   );
};

export default layout;
