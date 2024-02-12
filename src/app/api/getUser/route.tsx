import { NextResponse } from "next/server";

export interface UserReturnApiType {
  msg: String;
  token: String;
  id: String;
}

interface UserLoginType {
  email: String;
  password: String;
}

export const POST = async (req: Request, res: NextResponse) => {
  const { email, password }: UserLoginType = await req.json();
  try {

    const res = await fetch(`${process.env.API_USERS}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const user: UserReturnApiType = await res.json();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
