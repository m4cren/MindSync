import { db } from "@/lib/firebase/client";
import bcrypt from "bcryptjs";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
   const { pin }: { pin: string } = await request.json();

   const hashed_pin = await bcrypt.hash(pin, 10);

   const securityRef = collection(db, "security");

   const snap = await getDocs(securityRef);

   if (snap.empty) {
      const result = await addDoc(securityRef, { pin: hashed_pin });
      console.log(result);
      return NextResponse.json(
         { message: "Success creating new PIN" },
         { status: 201 },
      );
   } else {
      return NextResponse.json({ message: "Error" }, { status: 500 });
   }
}
