import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const { data, error } = await supabase.rpc("fetch_url_and_increment", { p_id: slug });
    if (error) throw error;
    return NextResponse.json({ url: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
