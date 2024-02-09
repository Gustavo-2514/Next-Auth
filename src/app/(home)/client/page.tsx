"use client";

import {  useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Client() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin?callbackUrl=/client");
    },
  });

 

  return (
    <div className="flex justify-center my-5 gap-3">
      <h1>Client Page</h1>
      <span>{session?.user?.email}</span>
    </div>
  );
}
