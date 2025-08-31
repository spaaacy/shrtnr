import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const fetchUrl = async () => {
    const slug = (await params).slug;
    try {
      const { data, error } = await supabase.from("url").select().eq("id", slug).single();
      if (error) throw error;
      return data.url;
    } catch (error) {
      console.error(error);
      return "/";
    }
  };

  const url = await fetchUrl();
  redirect(url);
};

export default Page;
