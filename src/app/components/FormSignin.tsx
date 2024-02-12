"use client";
import { SyntheticEvent, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FormLogin() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const params = useSearchParams();
  const { status } = useSession();

  useEffect(() => {
    status === "authenticated" ? redirect("/") : null;
  }, [status]);

  const handleAuth = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      return;
    }

    const callbackUrl = params.get("callbackUrl");
    router.replace(callbackUrl || "/");
  };
  return (
    <form className="flex flex-col gap-6  w-96 py-5 " onSubmit={handleAuth}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" text-neutral-950 p-2"
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password"> Senha </label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-neutral-950 p-2"
          type="password"
        />
      </div>
      <button
        type="submit"
        onClick={(e) => handleAuth(e)}
        className="bg-blue-600 p-2 rounded"
      >
        {" "}
        Entrar{" "}
      </button>
      <span>
        Ainda Não possui conta?<Link className="text-blue-400" href={"/auth/signup"}> Registre-se</Link>
      </span>
    </form>
  );
}
