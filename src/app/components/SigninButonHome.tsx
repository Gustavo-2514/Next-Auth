"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SigninButtonHome =  () => {
  const { data: session , status,  } = useSession();


  return (
    <>
      {session?.user ? (
        <button
        onClick={()=> signOut({ callbackUrl: 'http://localhost:3000'})}
          style={{
            backgroundColor: "White",
            color: "black",
            padding: "0.5rem",
            borderRadius: "0.25rem",
          }}
        >
         Sair
        </button>
      ) : (
        <Link href={"/auth/signin"}>
          <button
            style={{
              backgroundColor: "White",
              color: "black",
              padding: "0.5rem",
              borderRadius: "0.25rem",
            }}
          >
           Entrar
          </button>
        </Link>
      )}
    </>
  );
};
