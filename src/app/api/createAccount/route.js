import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    await connectDb();
    const { name, pin, uid } = await req.json();
    const hashedPin = await hash(pin, 10);

    const newUser = await User.create({ name, pin: hashedPin, uid });
    // return NextResponse.json({
    //   sucess: true,
    //   message: "Account created successfully",
    // });
    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
    });

    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: error.message,
    });
  }
}