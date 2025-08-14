"use client";
import { useGetTodayNetWorth } from "@/lib/hooks/netWorth/useGetTodayNetWorth";
import { useNetworthState } from "@/lib/hooks/netWorth/useNetworthState";
import { PropsWithChildren, useEffect, useState } from "react";

const InitialAppLoader = ({ children }: PropsWithChildren) => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useNetworthState();
   useGetTodayNetWorth();

   useEffect(() => {
      setIsLoading(false);
   }, []);

   if (isLoading) {
      return (
         <div className="flex items-center justify-center w-full h-screen">
            <span className="loading loading-dots loading-xl" />
         </div>
      );
   } else {
      return <>{children}</>;
   }
};

export default InitialAppLoader;
