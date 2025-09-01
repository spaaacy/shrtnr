import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, newId } = await req.json();
    const { error } = await supabase.from("url").update({ id: newId }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "URL ID updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
