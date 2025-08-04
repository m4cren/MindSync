"use client";
import deleteToken from "@/actions/deleteToken";
import React, { useEffect } from "react";

const DeleteCookieOnLoad = () => {
   useEffect(() => {
      deleteToken();
   }, []);
   return null;
};

export default DeleteCookieOnLoad;
