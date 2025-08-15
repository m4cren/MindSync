import { db } from "@/lib/firebase/client";
import { collection, getDocs } from "firebase/firestore";

export default async function getPin(): Promise<string | undefined> {
   const securityRef = collection(db, "security");

   const snap = await getDocs(securityRef);
   if (snap.empty) {
      return "000000";
   }

   const pinData: { id?: string; pin: string }[] = snap.docs.map((doc) => {
      const data = doc.data();

      return {
         id: doc.id,
         ...data,
      };
   }) as { id?: string; pin: string }[];

   if (pinData) {
      return pinData[0].pin;
   } else {
      return "000000";
   }
}
