import mongoose from "mongoose";
import { NextResponse } from "next/server";

export interface User {
  name: String;
  email: String;
  username: string;
}

export const POST = async (req: Request, res: Response) => {
  const { email, name, username }: User = await req.json();
  
  
  try {
    mongoose
      .connect(`${process.env.URI_DB}`)
      .then((res) => console.log("Conectado ao banco!"))
      .catch((error) => console.log(error.message));

    const User = mongoose.connection.collection("users");
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario não encontrado" },
        { status: 404 }
      );
    }

    // verificar a senha
    // verificar a senha
    // verificar a senha

    mongoose.connection
      .close()
      .then((res) => console.log("Desconectado do banco!"))
      .catch((error) => console.log(error.message));

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { error: error.message  },
      { status: 500 }
    );
  }
};
