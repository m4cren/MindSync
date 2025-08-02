"use client";

import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { MenuStateTypes } from "@/lib/types/StateTypes";
import classNames from "classnames";
import {
   Bot,
   House,
   Landmark,
   LucideIcon,
   Settings,
   Sprout,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const menus: MenuStateTypes[] = [
   {
      label: "Home",

      href: "/",
   },
   {
      label: "J.A.R.V.I.S",

      href: "/jarvis",
   },
   {
      label: "Daily Steps",

      href: "/routines",
   },
   {
      label: "Pocket Flow",

      href: "/expenses",
   },
   {
      label: "Settings",

      href: "/settings",
   },
];

const iconMap: Record<number, LucideIcon> = {
   0: House,
   1: Bot,
   2: Sprout,
   3: Landmark,
   4: Settings,
};

const Menu = () => {
   const {
      dispatch,
      popupState: { popup, togglePopup, untogglePopup },
   } = useGlobalState();
   const [selectedMenu, setSelectedMenu] = useState<number>(0);

   const router = useRouter();

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.altKey) {
            dispatch(togglePopup("menu"));
         }
         if (e.ctrlKey && e.key.toLocaleLowerCase() === ".") {
            dispatch(untogglePopup("menu"));
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);
   useEffect(() => {
      console.log(popup);
      if (popup.menu) {
         const changeMenu = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
               setSelectedMenu((prev) => (prev > 0 ? prev - 1 : 4));
            } else if (e.key === "ArrowRight") {
               setSelectedMenu((prev) => (prev < 4 ? prev + 1 : 0));
            }
         };

         window.addEventListener("keydown", changeMenu);

         return () => {
            window.removeEventListener("keydown", changeMenu);
         };
      }
   }, [popup]);

   useEffect(() => {
      if (popup.menu) {
         const enterMenu = (e: KeyboardEvent) => {
            const selectedHref = menus.find(
               (_, index) => index === selectedMenu,
            );
            if (e.key === "Enter") {
               router.push(`${selectedHref?.href}`);
               dispatch(untogglePopup("menu"));
            }
         };

         window.addEventListener("keydown", enterMenu);
         return () => {
            window.removeEventListener("keydown", enterMenu);
         };
      }
   }, [popup, selectedMenu]);

   if (popup.menu) {
      return (
         <div className="fixed bg-black/30 z-10 backdrop-blur-[1.6vw] top-0 left-0 bottom-0 right-0 flex flex-col  items-center justify-evenly gap-[7vw]">
            <Image
               width={200}
               height={200}
               alt="archlinux"
               src={"/images/archlinux.png"}
               className="menuToggleAnimation w-[16vw] h-[16vw]"
            />
            <ul className="flex flex-row items-center gap-[12vw]">
               {menus.map(({ label }, index) => {
                  const IconComponent = iconMap[index];
                  return (
                     <li
                        key={label}
                        className={classNames(
                           "menuToggleAnimation text-[1.08vw] font-medium opacity-40! flex flex-col gap-2 items-center scale-100 transition duration-140",
                           {
                              " [text-shadow:0_0_10px_rgba(255,255,255,0.35)] opacity-100! scale-115":
                                 selectedMenu === index,
                           },
                        )}
                     >
                        <IconComponent size={40} />
                        {label}
                     </li>
                  );
               })}
            </ul>
            <p className="text-[1vw] opacity-60 menuToggleAnimation">
               Welcome Engineer, Rainier
            </p>
         </div>
      );
   }
};

export default Menu;
