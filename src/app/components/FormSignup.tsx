"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function FormSignup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    status === "authenticated" ? redirect("/") : null;
  }, [status]);

  const handleAuth = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.API_USERS}/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const userRegistered = await res.json();

    if (userRegistered.error) {
      console.log(userRegistered.error);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
      return;
    }

    router.replace("/");
  };
  return (
    <form className="flex flex-col gap-6  w-96 py-5 " onSubmit={handleAuth}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name"> Nome: </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-neutral-950 p-2"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email"> Email: </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" text-neutral-950 p-2"
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password"> Senha:</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-neutral-950 p-2"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword"> Confirmar Senha: </label>
        <input
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
    </form>
  );
}
