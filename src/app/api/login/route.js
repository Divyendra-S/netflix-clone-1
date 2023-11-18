import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    await connectDb();
    const { pin, accountId, uid } = await req.json();
    

    const finduser = await User.findOne({ _id: accountId, uid: uid });
    if (!finduser) {
      return NextResponse.json({
        sucess: false,
        message: "User not found",
      });
    }
    const comparePin = await compare(pin, finduser.pin);
    if (comparePin) {
      return NextResponse.json({
        sucess: true,
        message: "Pin correct",
      });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      sucess: false,
      message: error.message,
    });
  }
}
