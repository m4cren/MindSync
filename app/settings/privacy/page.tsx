import React from "react";
import Form from "./Form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const page = async () => {
   const securityRef = collection(db, "security");

   const snap = await getDocs(securityRef);

   return <Form action={!snap.empty ? "change" : "new"} />;
};

export default page;
