"use server";

import { generateToken } from "@/lib/generateToken";
import { cookies } from "next/headers";

export default async function setCookie() {
   (await cookies()).set("authToken", generateToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
   });
}
