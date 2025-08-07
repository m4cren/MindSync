"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";

const InitialAppLoader = ({ children }: PropsWithChildren) => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
   }, []);

   if (isLoading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            MindSync Is Loading
         </div>
      );
   } else {
      return <>{children}</>;
   }
};

export default InitialAppLoader;
