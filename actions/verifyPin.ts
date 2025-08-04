"use server";
import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

export default async function verifyPin(pin: number): Promise<boolean> {
   const securityRef = doc(
      db,
      "security",
      process.env.NEXT_PUBLIC_PIN_PATHKEY!,
   );
   const validPin = await getDoc(securityRef);

   const valid = validPin.data();

   if (valid && pin === valid.pin) {
      return true;
   } else {
      return false;
   }
}
