import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    //const { searchParams } = new URL(req.url);
    //const searchParams = req.nextUrl.searchParams;
    //const id = searchParams.get("id");
    console.log("iddddddd", id);
    const users = await User.find();
    return NextResponse.json({
      sucess: true,
      message: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: error.message,
    });
  }
}
//{uid: id}