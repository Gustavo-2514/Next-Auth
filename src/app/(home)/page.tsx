"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import "@/app/globals.css";
export default function Home() {
  const {data } = useSession()
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {
        data?.user ? <h1>Home User Authenticated</h1>: <h1>Home User not Authenticated</h1>
      }
    </div>
  );
}
