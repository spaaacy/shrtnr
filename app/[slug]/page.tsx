import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const fetchUrl = async () => {
    const slug = (await params).slug;
    try {
      const { data, error } = await supabase.rpc("fetch_url_and_increment", { p_id: slug });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
      return "/404";
    }
  };

  const url = await fetchUrl();
  redirect(url);
};

export default Page;
