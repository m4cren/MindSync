import { db } from "@/lib/firebase/client";
import bcrypt from "bcryptjs";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
   const { pin, newPin }: { pin: string; newPin: string } =
      await request.json();

   const securityRef = collection(db, "security");

   const snap = await getDocs(securityRef);
   const data = snap.docs[0].data();
   const lastPinID = snap.docs[0].id;
   const lastPIN = data.pin;

   const checkIfSame = await bcrypt.compare(pin, lastPIN);

   if (checkIfSame) {
      const pinToChange = doc(securityRef, lastPinID);

      const new_hashed_pin = await bcrypt.hash(newPin, 10);
      await updateDoc(pinToChange, {
         pin: new_hashed_pin,
      });

      return NextResponse.json(
         { msg: "Success", status: true },
         { status: 201 },
      );
   } else {
      return NextResponse.json(
         { msg: "Incorrect password", status: false },
         { status: 200 },
      );
   }
}
