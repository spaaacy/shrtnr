import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, userId, id } = await req.json();
    const { error } = await supabase.from("url").insert({ user_id: userId, id, url });
    if (error) throw error;
    return NextResponse.json({ message: "URL created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
