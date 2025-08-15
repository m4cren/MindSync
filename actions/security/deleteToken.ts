"use server";
import { cookies } from "next/headers";

export default async function deleteToken() {
   (await cookies()).delete("authToken");
}
