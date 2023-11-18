import connectDb from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDb();
    
    const  searchParams  = request.nextUrl.searchParams
    const id = searchParams.get("id");
    const accountID = searchParams.get("accountId")
  
    

    const getAllFavorites = await Favorites.find({uid:id , accountID});
    

    if (getAllFavorites) {
      return NextResponse.json({
        success: true,
        data: getAllFavorites,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong",
      });
    }
    // const { searchParams} = new URL(req.url);
    // const id = searchParams.get('id');
    // const accountId = searchParams.get('accountId');
    // const favorites = await Favorites.find({uid: id, accountId});
    // return NextResponse.json({success: true, data: favorites})
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, err: err.message });
  }
}
