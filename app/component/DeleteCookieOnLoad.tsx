"use client";
import deleteToken from "@/actions/deleteToken";
import { useEffect } from "react";

const DeleteCookieOnLoad = () => {
   useEffect(() => {
      deleteToken();
   }, []);
   return null;
};

export default DeleteCookieOnLoad;
