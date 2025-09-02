import { supabase } from "@/utils/supabase";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const fetchUrl = async () => {
    const slug = (await params).slug;
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/url/redirect`, {
        method: "POST",
        body: JSON.stringify({ slug }),
      });
      const result = await request.json();
      if (request.status !== 200) {
        throw result.error;
      }
      return result.url;
    } catch (error) {
      console.error(error);
      return "/404";
    }
  };

  const url = await fetchUrl();
  redirect(url);
};

export default Page;
