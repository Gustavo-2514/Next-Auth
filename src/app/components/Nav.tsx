"use client";
import Link from "next/link";
import { SigninButtonHome } from "./SigninButonHome";
import { useSession } from "next-auth/react";

export default function Nav() {
  const {data:session ,status } = useSession();
  
  return (
    <>
      {status === "authenticated" ? (
        <nav className="flex justify-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/client"}>Client</Link>
            </li>
            <li>
              <Link href={"/server"}>Server</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <SigninButtonHome />
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="flex justify-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <SigninButtonHome />
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
