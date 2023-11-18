import connectDb from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const data = await req.json();
    const alreadyExist = await Favorites.find({
      uid: data.uid,
      movieID: data.movieID,
      accountID: data.accountID,
    });
    if(alreadyExist && alreadyExist.length > 0) {
        return NextResponse.json({
            success: false,
            message: "already added",
        })
    }
    //const addFavorite = await Favorites.create(data);
    const newlyAddedFavorite = await Favorites.create(data);

    if (newlyAddedFavorite) {
      return NextResponse.json({
        success: true,
        message: "Added to your list successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong",
      });
    }
    return NextResponse.json({success: true, message:"successfully added",})
  } catch (err) {
    console.log(err);
    NextResponse.json({success: false, message: err.message});
  }
}
