import Image from "next/image";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
   return (
      <main className="flex flex-col  w-screen h-fit min-h-screen pb-[20vw]">
         <Image
            src={"/images/banner/banner.gif"}
            width={1920}
            height={1080}
            alt="banner"
            className="w-full h-[15vw] object-cover object-center"
         />
         <section className="flex flex-col gap-[2vw] px-[8vw]">
            {children}
         </section>
      </main>
   );
};

export default layout;
