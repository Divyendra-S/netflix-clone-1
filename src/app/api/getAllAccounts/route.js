import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";


const getId = async(reqs)=>{
  const searchParams = reqs.nextUrl.searchParams;
    const id = searchParams.get("id");
}
export async function GET(req) {
  try {
    await connectDb();
    //const { searchParams } = new URL(req.url);
    await getId(req);
    console.log("iddddddd", id);
    const users = await User.find({ uid: id });
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
//{uid: id} searchParams.get("id");
