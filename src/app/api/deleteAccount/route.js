import connectDb from "@/database";
import User from "@/models/Account";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectDb();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const user = await User.deleteOne({_id: id});
        // return NextResponse.json({
        //     sucess: true,
        //     message: 'User deleted successfully',
        // });
        const response = NextResponse.json({
            success: true,
            message: 'User deleted successfully',
          });
      
          response.headers.set('Cache-Control', 'no-store');
      
          return response;
    } catch (error) {
        console.log(error);
    }
}