"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import "@/app/globals.css";
export default function Home() {
  const {data } = useSession()
  return (
    <div className="flex justify-center my-5 gap-3">
      {
        data?.user ? <h1>Home User Authenticated</h1>: <h1>Home User not Authenticated</h1>
      }
    </div>
  );
}
