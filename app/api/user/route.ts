import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongo"
import User from "@/models/User";     // Adjust relative path if your folders are structured differently

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, ...updateData } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Upsert the user document
    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}