import connectDb from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Couldn't find id" });
    }
    const delle = await Favorites.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
