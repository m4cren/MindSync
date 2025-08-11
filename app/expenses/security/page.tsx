import { Metadata } from "next";

import Security from "./component/Security";

const page = () => {
   return <Security />;
};

export default page;

export const metadata: Metadata = {
   title: "Please authorize",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
