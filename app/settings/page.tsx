import { Metadata } from "next";
import Footer from "./Footer";

const settings = [
   { label: "USER SETTINGS", values: ["Profile", "Privacy"] },
   {
      label: "APP SETTINGS",
      values: ["Appearance", " Accessibility", "Keybinds"],
   },
];
const page = () => {
   return (
      <div className="grid grid-cols-[27vw_1fr] justify-center w-screen h-screen">
         <div className="flex items-center justify-end">
            <div className="flex flex-col gap-[1vw] w-[60%] text-[1vw] font-semibold">
               {settings.map(({ label, values }) => (
                  <ul key={label} className="flex flex-col gap-[1vw]">
                     <div className="flex flex-col gap-[0.8vw]">
                        <hr className="text-card bg-card h-[0.2vw]" />
                        <h3 className="opacity-50 text-[0.7vw]! ">{label}</h3>
                     </div>
                     <div className="flex flex-col gap-[0.4vw]  ">
                        {values.map((item) => (
                           <li
                              key={item}
                              className="hover:bg-card hover:rounded-l-[0.5vw] cursor-pointer "
                           >
                              <p className="py-[0.2vw] pl-[0.8vw]"> {item}</p>
                           </li>
                        ))}
                     </div>
                  </ul>
               ))}
               <Footer />
            </div>
         </div>
         <div className="bg-card"></div>
      </div>
   );
};

export default page;
export const metadata: Metadata = {
   title: "MindSync | Setings",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
