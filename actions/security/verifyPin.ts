"use server";
import bcrypt from "bcryptjs";
import getPin from "../getPin";

export default async function verifyPin(pin: string): Promise<boolean> {
   const hashed_pin = (await getPin()) as string;

   const isValid = await bcrypt.compare(pin, hashed_pin);

   if (!hashed_pin || hashed_pin == "000000") {
      return true;
   }

   if (hashed_pin && isValid) {
      return true;
   } else {
      return false;
   }
}
