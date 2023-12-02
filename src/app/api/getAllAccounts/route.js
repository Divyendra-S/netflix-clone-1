import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';



export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connectDb();
    //const { searchParams } = new URL(req.url);
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    console.log("iddddddd", id);
    
    const users = await User.find({uid: id});
    // return NextResponse.json({
    //   sucess: true,
    //   message: users,
    // });

    const response = NextResponse.json({
      success: true,
      message: users
    });

    //response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: error.message,
    });
  }
}
//{uid: id} searchParams.get("id"); { uid: 65616112 }
