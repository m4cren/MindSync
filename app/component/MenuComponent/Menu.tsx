"use client";

import classNames from "classnames";
import { Bot, House, Landmark, LucideIcon, Sprout } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const menus: { label: string; href: string }[] = [
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
];

const iconMap: Record<number, LucideIcon> = {
   0: House,
   1: Bot,
   2: Sprout,
   3: Landmark,
};

const Menu = () => {
   const [isToggle, setIsToggle] = useState<boolean>(false);
   const [selectedMenu, setSelectedMenu] = useState<number>(0);

   const router = useRouter();

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.ctrlKey && e.altKey) {
            setIsToggle((prev) => !prev);
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);
   useEffect(() => {
      if (isToggle) {
         const changeMenu = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
               setSelectedMenu((prev) => (prev > 0 ? prev - 1 : 3));
            } else if (e.key === "ArrowRight") {
               setSelectedMenu((prev) => (prev < 3 ? prev + 1 : 0));
            }
         };

         window.addEventListener("keydown", changeMenu);

         return () => {
            window.removeEventListener("keydown", changeMenu);
         };
      }
   }, [isToggle]);

   useEffect(() => {
      if (isToggle) {
         const enterMenu = (e: KeyboardEvent) => {
            const selectedHref = menus.find(
               (_, index) => index === selectedMenu,
            );
            if (e.key === "Enter") {
               router.push(`${selectedHref?.href}`);
               setIsToggle(false);
            }
         };

         window.addEventListener("keydown", enterMenu);
         return () => {
            window.removeEventListener("keydown", enterMenu);
         };
      }
   }, [isToggle, selectedMenu]);

   if (isToggle) {
      return (
         <div className="fixed bg-black/30 z-10 backdrop-blur-xl top-0 left-0 bottom-0 right-0 flex flex-col  items-center justify-evenly gap-[7vw]">
            <Image
               width={200}
               height={200}
               alt="archlinux"
               src={"/images/archlinux.png"}
               className="menuToggleAnimation"
            />
            <ul className="flex flex-row items-center gap-[12vw]">
               {menus.map(({ label }, index) => {
                  const IconComponent = iconMap[index];
                  return (
                     <li
                        key={label}
                        className={classNames(
                           "menuToggleAnimation text-[1.4vw] font-medium opacity-40! flex flex-col gap-2 items-center scale-100 transition duration-140",
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
