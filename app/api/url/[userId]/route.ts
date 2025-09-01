import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split("/")[3];
    const { data, error } = await supabase.from("url").select().eq("user_id", userId);
    if (error) throw error;
    return NextResponse.json({ links: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
