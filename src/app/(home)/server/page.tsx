import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Servidor() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin?callbackUrl=/server");
  }

  return (
    <div className="flex justify-center my-5 gap-3">
      <h1>Servidor Page</h1>
      <span>{session?.user?.email}</span>
    </div>
  );
}
