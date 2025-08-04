import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/animations.css";
import Menu from "./component/Menu/Menu";
import ReduxProvider from "@/store/ReduxProvider";
import DeleteCookieOnLoad from "./component/DeleteCookieOnLoad";

const inter = Inter({
   variable: "--font-inter",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "MindSync",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" data-theme="business">
         <DeleteCookieOnLoad />
         <ReduxProvider>
            <body className={`${inter.variable}  antialiased`}>
               <Menu />
               {children}
            </body>
         </ReduxProvider>
      </html>
   );
}
