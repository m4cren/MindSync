"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";

const InitialAppLoader = ({ children }: PropsWithChildren) => {
   const [isLoading, setIsLoading] = useState<boolean>(true);

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
